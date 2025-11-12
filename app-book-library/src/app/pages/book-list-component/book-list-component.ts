import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from '../../shared/components/best-seller-component/best-seller-component';


@Component({
  selector: 'app-book-list-component',
  imports: [
    MatInputModule, 
    MatIconModule, 
    FormsModule, 
    MatButtonModule, 
    CommonModule, 
    MatIconButton, 
    BestSellerComponent
    ],
  templateUrl: './book-list-component.html',
  styleUrl: './book-list-component.css',
})
export class BookListComponent {

  searchBook: string = "";
  title: string = "Find Your Next Read at the Lowest Price";
  description: string = `From educational resources applied to the mind, 
    we have a lot of textbooks to offer you. 
    We only offer best-selling books for rent.`;

  constructor(
    private router: Router
  ){}

  showBookSearched(): void {
    console.log('El libro que se quiere buscar es: ' , this.searchBook);
  }

  navegarDetalleLibre(): void {

    this.router.navigate(['/Detalle-libro']);

  }

 

}
