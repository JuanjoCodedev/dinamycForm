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

  constructor() {
    this._initForm();
  }

  private _initForm(): void {
    this.inputs.forEach((input: InterfaceFormInput) => {
      const control = new FormControl('');

      // ?Para Verificar si el subgrupo existe
      let group = this.form.get(input.group) as FormGroup;
      if (!group) {
        group = new FormGroup({});
        this.form.addControl(input.group, group);
      }

      // ?PAra Agregar los controles a su respectivo FormGroup
      group.addControl(input.formControlName, control);
    });
  }

  get basicDataGroup(): FormGroup {
    return this.form.get('basicData') as FormGroup;
  }

  get deliveryGroup(): FormGroup {
    return this.form.get('delivery') as FormGroup;
  }

  get pqrGroup(): FormGroup {
    return this.form.get('pqr') as FormGroup;
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
    console.log(this.form.value);
  }
}
