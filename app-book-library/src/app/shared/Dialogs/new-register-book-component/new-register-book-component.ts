import { Component } from '@angular/core';
import { FormInput } from '../../forms/form-input/form-input';
import { FormSelect } from "../../forms/form-select/form-select";
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { HttpBookService } from '../../../features/services/HttpBookService';
import { MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { title } from 'process';
import { MatSnackBar } from '@angular/material/snack-bar';


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
    private _snackBar: MatSnackBar
  ) {
    console.log("Servicio recibido-> " , this.httpBookService);

    this.registerBookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price: ['', Validators.required],
      year: ['', [Validators.required,  Validators.min(1500)]],
      genre: ['', Validators.required]
    })
    this.chargeAudio();
    console.warn('*******************************' , this.registerBookForm.get('author')?.disabled);
  }



  onSubmit(): void {

    if(this.registerBookForm.valid) {
      console.log('-------------this form is valid! --------------> ');
      console.log('Validado:  ' , this.registerBookForm.valid);
      console.log('Controles: ' , this.registerBookForm.controls);
      console.log('Status:    ' , this.registerBookForm.status);
      console.log('Touched:   ', this.registerBookForm.touched);
      console.log('Valores:   ' , this.registerBookForm.value);
      console.log('-----------------------------------------------');

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
          console.warn('Enviado con exito -> ' , response.status);

          this._snackBar.open(  'New book has been registered!','Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
          this.playbackAduio();
          this.refresh();
          this.windowsDialog.close(response);
        },
        error: (err)=> {
           console.error('Errores durante el envio-> ' , err);

           this._snackBar.open('It has not been possible to register a new book!','Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
          this.refresh()
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
