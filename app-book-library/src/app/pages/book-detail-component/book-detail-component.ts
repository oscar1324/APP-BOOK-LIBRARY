import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Ibook } from '../../models/IBook.model';
import { CommonModule } from '@angular/common';
import { MatIconButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HttpBookService } from '../../features/services/HttpBookService';
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
    private cd: ChangeDetectorRef
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
      console.log('Datos recibidos: ' , params);
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
      console.error('A problem has during playback -> ', error);
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
        console.warn('Se ha realizado la petición de manera exitosa -> ', response.status);
        this.playbackAduio();
        this._snackBar.open('The book has been update!','Close',{
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        });
        
        this.navegacion.navigate(['/Libreria-Salamanca']).then(()  => window.location.reload());

      },
      error: (err) => {
        console.log('Error durante la peticion Http post -> ', err);
      }
    })

    console.warn(objeto_json);
   

  }

  deleteRequest(): void {
    console.log('Deleting book with id -> ', this.data.id);

    this.bookService.deteleById(this.data.id).subscribe ({
      next: (response)=> {
        if(response){
          console.log("Se ha eliminado con Exito");

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
      error: (err)=> {

        console.log("Problemas durante la eliminación -> " , err);
      }
    })
  }
}
