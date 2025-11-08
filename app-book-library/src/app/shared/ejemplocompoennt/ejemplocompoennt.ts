import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BestSellerComponent } from '../../shared/best-seller-component/best-seller-component';


import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-ejemplocompoennt',
  imports: [
    MatInputModule, 
    MatIconModule, 
    FormsModule, 
    MatButtonModule, 
    CommonModule, 
    MatIconButton, 
    BestSellerComponent,
  ],
  templateUrl: './ejemplocompoennt.html',
  styleUrl: './ejemplocompoennt.css',
})
export class Ejemplocompoennt {

}
