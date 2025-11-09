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

@Component({
  selector: 'app-book-detail-component',
  imports: [MatIconButton, MatButtonModule,MatIconModule, CommonModule],
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

  constructor(
    private router: ActivatedRoute,
    private navegacion: Router,
    private bookService: HttpBookService,
    private _snackBar: MatSnackBar
  ) {

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
    })
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
