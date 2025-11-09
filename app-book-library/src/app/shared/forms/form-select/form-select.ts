import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Component, Input , forwardRef} from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { FormInput } from '../form-input/form-input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/select';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-select',
  imports: [CommonModule, ReactiveFormsModule,MatInputModule,MatSelect,MatOption, FormsModule],
  templateUrl: './form-select.html',
  styleUrl: './form-select.css',
    providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormSelect),
    multi: true
  }]
})
export class FormSelect implements ControlValueAccessor{

  @Input() label!: string;
  genreArray = [
    { valor:'Mystery novel', nombre: 'Mystery novel'},
    { valor:'Fiction', nombre: 'Fiction'},
    { valor:'self-help', nombre: 'self-help'},
    { valor:'Romantic novel', nombre: 'Romantic novel'}
  ]
  valueSelect: string ="";

  onChange = (value: any) => {};
  onTouched = () => {};

  writeValue(value: any): void { this.valueSelect = value; }
  registerOnChange(fn: any): void { this.onChange = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }
}
