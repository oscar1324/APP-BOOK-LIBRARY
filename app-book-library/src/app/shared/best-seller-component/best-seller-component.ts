import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewBookComponent } from '../new-book-component/new-book-component';


@Component({
  selector: 'app-best-seller-component',
  imports: [MatIconButton, MatButtonModule,MatIconModule],
  templateUrl: './best-seller-component.html',
  styleUrl: './best-seller-component.css',
})
export class BestSellerComponent {

  title: string = "Best Seller Books";

  constructor(
    private windowsDialog: MatDialog
  ) {

  }

  openDialog(): void {
    this.windowsDialog.open(NewBookComponent, {
      width: '500px',
      height: '500px',
      enterAnimationDuration: '700ms'
    })
    
  }
}
