import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewBookComponent } from '../../Dialogs/new-register-book-component/new-register-book-component';
import { HttpBookService } from '../../../features/services/HttpBookService';
import { OnInit } from '@angular/core';
import { Ibook } from '../../../models/IBook.model';
import { CommonModule } from '@angular/common';
import { BookCard } from '../book-card/book-card';
import {inject, EnvironmentInjector } from '@angular/core';


@Component({
  selector: 'app-best-seller-component',
  imports: [MatIconButton, MatButtonModule,MatIconModule, CommonModule, BookCard],
  templateUrl: './best-seller-component.html',
  styleUrl: './best-seller-component.css',
})
export class BestSellerComponent implements OnInit{

  title: string = "Best Seller Books";
  booksArray: Ibook[] = [];
  oldLengthBookArray: number = 0;
  private injector = inject(EnvironmentInjector);

  constructor(
    private windowsDialog: MatDialog,
    private bookService: HttpBookService
  ) {

  }

  ngOnInit(): void {
    this.executeGetAllBooks();
    this.oldLengthBookArray = this.booksArray.length;
  }


  thinking(): void  {
    console.log('valor de oldLengthBookArray -> ' , this.oldLengthBookArray);
    const newLengthBookArray = this.booksArray.length;
    console.log('valor de newLengthBookArray -> ' , newLengthBookArray);
    

    if(this.oldLengthBookArray < newLengthBookArray){
      console.warn('Se ha añadido valor nuevo');
    }
  }

  openDialog(): void {
    const dialogRef = this.windowsDialog.open(NewBookComponent, {
      width: '450px',
      height: '560px',
      enterAnimationDuration: '700ms',
      injector: this.injector
    })

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.booksArray.push(result);

      }
    })
  }

  executeGetAllBooks(): void {
    
    this.bookService.getAllBooks().subscribe( {
      next: (result) => {

        if (result) {
          console.log(result);
          this.booksArray = result;
        } else {
          console.error('No se han podido encontrar resultados');
        }
      }
      
    })

  }
}
