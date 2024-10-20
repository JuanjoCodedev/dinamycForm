import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Interfaces */
import { InterfaceFormInput } from '../../shared/interfaces/formInput.interface';

/* PrimeNg */
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-pqr',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule, DropdownModule],
  templateUrl: './pqr.component.html',
  styleUrl: './pqr.component.css',
})
export class PqrComponent {
  @Input() formPqr!: FormGroup;
  @Input() inputs: InterfaceFormInput[] = [];

  get pqrInputs(): InterfaceFormInput[] {
    return this.inputs.filter((input: InterfaceFormInput) => input.group === 'pqr');
  }
}
