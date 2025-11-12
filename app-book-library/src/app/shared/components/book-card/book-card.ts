import { Component, Input } from '@angular/core';
import { HttpBookService } from '../../../core/services/HttpBookService';
import { Ibook } from '../../../models/IBook.model';
import { CommonModule } from '@angular/common';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoggerService } from '../../../core/services/loggerService';

@Component({
  selector: 'app-book-card',
  imports: [CommonModule,MatButtonModule,MatIconModule],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard implements OnInit{

  @Input() book!:Ibook;
  

  constructor( private router: Router, private loggerService: LoggerService) {

  }

  ngOnInit(): void {
      
  }

  viewDetail(): void {
    
    const id = this.book.id;

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
  }
}
