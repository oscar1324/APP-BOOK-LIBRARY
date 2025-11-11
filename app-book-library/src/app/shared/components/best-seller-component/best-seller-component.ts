import { ChangeDetectorRef, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewBookComponent } from '../../Dialogs/new-register-book-component/new-register-book-component';
import { HttpBookService } from '../../../core/services/HttpBookService';
import { OnInit } from '@angular/core';
import { Ibook } from '../../../models/IBook.model';
import { CommonModule } from '@angular/common';
import { BookCard } from '../book-card/book-card';
import {inject, EnvironmentInjector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggerService } from '../../../core/services/loggerService';


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
    private bookService: HttpBookService,
    private _snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private loggerService: LoggerService
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

          if(result.status >= 500) {
            this._snackBar.open('5xx Internal Server Error!','Close',{
              duration: 3000,
              horizontalPosition: 'center',
              verticalPosition: 'bottom',
              
            });
            this.loggerService.error('Failed to fetch books', result.status);
          } 

          this.loggerService.log('Data fetched successfully. Length of data-> ', result.body.length);
          this.booksArray = result.body;
          this.cdr.detectChanges();
        } else {
          this.loggerService.log('Is didn´t fetch any data' , '');
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
