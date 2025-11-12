import { CommonModule } from '@angular/common';
import { Component, Input, forwardRef, OnChanges, SimpleChanges } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  imports: [CommonModule,ReactiveFormsModule,MatInputModule, FormsModule, MatFormFieldModule],
  templateUrl: './form-input.html',
  styleUrl: './form-input.css',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => FormInput),
    multi: true
  }]
})
export class FormInput implements ControlValueAccessor, OnChanges{


  @Input() label!: string;
  @Input() control!: FormControl;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() inputValue!: any;
  IsDisabled: boolean = false;

  constructor() {
   
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['inputValue'] && !changes['inputValue'].firstChange) {
      this.inputValue = changes['inputValue'].currentValue;
    }
  }


  onChange = (valor: any) => {};
  onTouched = () => {};

  writeValue(value: any): void {
    this.inputValue = value
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
      this.IsDisabled = isDisabled;
  }
  
}
