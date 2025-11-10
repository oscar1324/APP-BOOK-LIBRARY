import { Component, Input } from '@angular/core';
import { HttpBookService } from '../../../features/services/HttpBookService';
import { Ibook } from '../../../models/IBook.model';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard implements OnInit{

  @Input() book!:Ibook;
  

  constructor( private router: Router) {

  }

  ngOnInit(): void {
      
  }

  viewDetail(): void {
    console.log("View details ----> ", this.book );
    const id = this.book.id;
    console.log("View details ----> ", this.book.author );
    console.log("View details ----> ", this.book.price );
    console.log("View details ----> ", this.book.genre );
    this.router.navigate(['/Detalle-libro', id], {
      queryParams: {
        id: this.book.id,
        title: this.book.title,
        author: this.book.author,
        year: this.book.year,
        genre: this.book.genre,
        price: this.book.price,
      }
    })
    // Probar query parameters
    // State -
  }



}
