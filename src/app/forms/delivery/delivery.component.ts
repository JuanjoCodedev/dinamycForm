import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Interfaces */
import { InterfaceFormInput } from '../../shared/interfaces/formInput.interface';

/* PrimeNg */
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './delivery.component.html',
  styleUrl: './delivery.component.css',
})
export class DeliveryComponent {
  @Input() formDelivery!: FormGroup;
  @Input() inputs: InterfaceFormInput[] = [];

  get deliveryInputs(): InterfaceFormInput[] {
    return this.inputs.filter((input: InterfaceFormInput) => input.group === 'delivery');
  }
}
