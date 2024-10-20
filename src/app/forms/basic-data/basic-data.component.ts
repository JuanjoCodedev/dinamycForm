import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Interfaces */
import { InterfaceFormInput } from '../../shared/interfaces/formInput.interface';

/* PrimeNg */
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-basic-data',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './basic-data.component.html',
  styleUrls: ['./basic-data.component.css'],
})
export class BasicDataComponent {
  @Input() formProfile!: FormGroup;
  @Input() inputs: InterfaceFormInput[] = [];

  get basicDataInputs(): InterfaceFormInput[] {
    return this.inputs.filter((input: InterfaceFormInput) => input.group === 'basicData');
  }
}
