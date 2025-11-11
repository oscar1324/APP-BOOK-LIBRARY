import { Component } from '@angular/core';
import { FormInput } from '../../forms/form-input/form-input';
import { FormSelect } from "../../forms/form-select/form-select";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpBookService } from '../../../core/services/HttpBookService';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { title } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../core/services/loggerService';


@Component({
  selector: 'app-new-book-component',
  imports: [
    FormInput, 
    FormSelect, 
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './new-register-book-component.html',
  styleUrl: './new-register-book-component.css',
})
export class NewBookComponent {

  private audioPlayer!: HTMLAudioElement;
  registerBookForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private httpBookService: HttpBookService,
    private windowsDialog: MatDialogRef<NewBookComponent>,
    private _snackBar: MatSnackBar,
    private loggerService: LoggerService
  ) {


    this.registerBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      year: ['', [Validators.required,  Validators.min(1500)]],
      genre: ['', Validators.required]
    })
    this.chargeAudio();

  }



  onSubmit(): void {

    if(this.registerBookForm.valid) {

      this.loggerService.log('Status of validators: ', this.registerBookForm.valid);

      const objeto_json: any = {
        
        title: this.registerBookForm.value.title,
        author: this.registerBookForm.value.author ,
        year: this.registerBookForm.value.year,
        genre: this.registerBookForm.value.genre,
        price: this.registerBookForm.value.price,
        id: 3,
      }


      this.httpBookService.insertNewBook(objeto_json).subscribe({
        next: (response)=> {
          this.loggerService.log('The HttpRequest was correct: ', response.status);

          this._snackBar.open(  'New book has been registered!','Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
          this.playbackAduio();
          this.refresh();
          this.windowsDialog.close(response);
        },
        error: (error)=> {
          this.loggerService.error('Error during the insert HttpRequest: ', error);

          let errorMessage = 'An unknown error occurred. Please try again.';

          if (error.status === 0) {
            errorMessage = 'Connection error! Check your network.';
          } else if (error.status >= 500) {
            errorMessage = 'Internal Server Error 5xx.';
          } else if (error.status >= 400) {
            errorMessage = 'Request failed. Please check the data submitted.';
          }

          this._snackBar.open('It has not been possible to register a new book!','Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
     
        }
      })

    } else {
      this._snackBar.open( 'You have to review the form!','Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
    }
  }

  refresh(): void {
    setTimeout(()=> {
      window.location.reload();

    }, 2500);
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
}
