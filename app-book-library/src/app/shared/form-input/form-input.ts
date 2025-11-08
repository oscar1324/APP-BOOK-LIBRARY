import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-form-input',
  imports: [CommonModule,ReactiveFormsModule,MatInputModule, FormsModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
})
export class FormInput implements OnInit{


  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() placeholder!: string;

  inputValue!: any;

  ngOnInit(): void {
      
 
  }
  
}
