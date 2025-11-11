import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Ibook } from '../../models/IBook.model';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpBookService } from '../../core/services/HttpBookService';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormInput } from '../../shared/forms/form-input/form-input';
import { FormSelect } from '../../shared/forms/form-select/form-select';
import { MatSelect } from "@angular/material/select";
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { error } from 'console';
import { LoggerService } from '../../core/services/loggerService';


@Component({
  selector: 'app-book-detail-component',
  imports: [MatFormFieldModule,MatInputModule,ReactiveFormsModule,FormSelect, FormInput, MatIconButton, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './book-detail-component.html',
  styleUrl: './book-detail-component.css',
})
export class BookDetailComponent implements OnInit{

  data: Ibook = {
    id:0, 
    title: "", 
    author: "", 
    year: 0, 
    genre:  "", 
    price: 0
  };

  audioPlayer!: HTMLAudioElement;
  updateBookForm!: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
    private router: ActivatedRoute,
    private navegacion: Router,
    private bookService: HttpBookService,
    private _snackBar: MatSnackBar,
    private cd: ChangeDetectorRef,
    private loggerService: LoggerService
  ) {

    this.updateBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      year: ['', [Validators.required,  Validators.min(1500)]],
      genre: ['', Validators.required]
    })
    this.chargeAudio();
    
  }


  ngOnInit(): void {
    
    this.router.queryParams.subscribe(params => {
      this.loggerService.log('Review the params data', params);

      this.data = {
        id: params['id'],
        title: params['title'],
        author: params['author'],
        year: params['year'],
        genre: params['genre'],
        price: params['price']
      }

      // Damos valores al formulario
      this.updateBookForm.patchValue({
        title: this.data.title,
        author: this.data.author,
        year: this.data.year,
        genre: this.data.genre,
        price: this.data.price
      });

      this.cd.detectChanges();
    });
  }

  chargeAudio(): void {
    this.audioPlayer = new Audio();
    this.audioPlayer.src= "assets/audio/correcto.mp3"
    this.audioPlayer.load();
  }

  playbackAduio(): void {

    this.audioPlayer.play().catch( error => {
      this.loggerService.error('Problem has during playback -> ', error);
    })
  }

  updateRequest(): void {

    const objeto_json = {
      title: this.updateBookForm.value.title,
      author: this.updateBookForm.value.author ,
      year: this.updateBookForm.value.year,
      genre: this.updateBookForm.value.genre,
      price: this.updateBookForm.value.price,
      id: this.data.id
    };

    this.bookService.updateBook(objeto_json).subscribe({
      next: (response) => {

        if(response.status >= 500) {
          this._snackBar.open('5xx Internal Server Error!','Close',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
              
          });
          this.loggerService.error('Failed to fetch books', response.status);
        } 

        this.loggerService.log('Data fetched succesfully -> ', response.status);
        this.playbackAduio();
        this._snackBar.open('The book has been update!','Close',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
        this.navegacion.navigate(['/Libreria-Salamanca']).then(()  => window.location.reload());

      },
      error: (err) => {
        console.log('Error during the Http request -> ', err);
        this.loggerService.error('Failed to fetch books', err);
      }
    })

  }

  deleteRequest(): void {

    this.bookService.deteleById(this.data.id).subscribe ({
      next: (response)=> {
        if(response){

          if(response.status >= 500) {
            this._snackBar.open('5xx Internal Server Error!','Close',{
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
                
            });
            this.loggerService.error('Failed to fetch books', response.status);
          } 

          this.loggerService.log('This book has been deleted, status: ', response.status);

          this.playbackAduio();
          this._snackBar.open('The book has been deleted!','Close',{
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          setTimeout( () =>{
            this.navegacion.navigate(['/Libreria-Salamanca']);
          },2000);
          
        }
      },
      error: (error) => {
        this.loggerService.error('Error during the insert HttpRequest: ', error);

        let errorMessage = 'An unknown error occurred. Please try again.';

        if (error.status === 0) {
          errorMessage = 'Connection error! Check your network.';
        } else if (error.status >= 500) {
          errorMessage = 'Internal Server Error 5xx.';
        } else if (error.status >= 400) {
          errorMessage = 'Request failed. Please check the data submitted.';
        }
      }
    })
  }
}
