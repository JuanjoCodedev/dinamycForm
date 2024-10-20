import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

/* Archvios JSON */
import formInputs from '../form-inputs.json';

/* Interfaces */
import { InterfaceFormInput } from '../shared/interfaces/formInput.interface';

/* Componentes */
import { BasicDataComponent } from '../forms/basic-data/basic-data.component';
import { DeliveryComponent } from '../forms/delivery/delivery.component';
import { PqrComponent } from '../forms/pqr/pqr.component';

/* PrimeNg */
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { FormService } from '../shared/services/form.service';

@Component({
  selector: 'app-steps',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, BasicDataComponent, DeliveryComponent, PqrComponent, StepsModule, ButtonModule, ButtonGroupModule],
  templateUrl: './steps.component.html',
  styleUrl: './steps.component.css',
})
export class StepsComponent {
  activeStepIndex: number = 0;
  steps = [{ label: 'Datos del usuario' }, { label: 'Dirección de entrega' }, { label: 'Quejas' }];

  inputs: InterfaceFormInput[] = formInputs;
  form: FormGroup = new FormGroup({});

  constructor(private formService: FormService) {
    this.formService.initForm(this.form);
  }

  get currentGroup(): FormGroup {
    const currentGroup = this.formService.getCurrentGroup(this.form, this.activeStepIndex);
    return currentGroup;
  }

  next(): void {
    if (this.activeStepIndex < this.steps.length - 1) {
      this.activeStepIndex++;
    }
  }

  prev(): void {
    if (this.activeStepIndex > 0) {
      this.activeStepIndex--;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      console.log('Formulario inválido');
    }
  }
}
