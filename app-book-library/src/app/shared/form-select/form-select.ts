import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';

@Component({
  selector: 'app-form-select',
  imports: [CommonModule, ReactiveFormsModule,MatInputModule,MatSelect,MatOption, FormsModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.css',
})
export class FormSelect {

  @Input() label!: string;
  genreArray = [
    { valor:'Mystery novel', nombre: 'Mystery novel'},
    { valor:'Fiction', nombre: 'Fiction'},
    { valor:'self-help', nombre: 'self-help'},
    { valor:'Romantic novel', nombre: 'Romantic novel'}
  ]
  valueSelect: string ="";
}
