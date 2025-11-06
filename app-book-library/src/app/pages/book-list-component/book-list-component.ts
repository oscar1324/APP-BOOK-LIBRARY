import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list-component',
  imports: [],
  templateUrl: './book-list-component.html',
  styleUrl: './book-list-component.css',
})
export class BookListComponent {

  constructor(
    private router: Router
  ){}

  navegarDetalleLibre(): void {

    this.router.navigate(['/Detalle-libro']);

  }

 

}
