import { Component } from '@angular/core';
import { FormInput } from '../form-input/form-input';
import { FormSelect } from "../form-select/form-select";
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-new-book-component',
  imports: [FormInput, FormSelect, MatButtonModule],
  templateUrl: './new-book-component.html',
  styleUrl: './new-book-component.css',
})
export class NewBookComponent {

}
