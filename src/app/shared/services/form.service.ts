import { Injectable } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

/* Archivo JSON */
import formInputs from '../../form-inputs.json';

/* Interfaces */
import { InterfaceFormInput, InterfaceValidator } from '../interfaces/formInput.interface';

@Injectable({ providedIn: 'root' })
export class FormService {
  constructor() {}

  /**
   * ?Inicializa un formulario a partir de un conjunto de entradas definidas en un archivo JSON.
   * ?Para cada entrada, se crea un nuevo control y se añade al grupo correspondiente.
   *
   * *@param form - El FormGroup que se va a inicializar.
   */
  initForm(form: FormGroup): void {
    formInputs.forEach((input: InterfaceFormInput) => {
      const validators = this.getValidators(input.validators || []);
      const control = new FormControl('', validators);

      // ?Verificar si el subgrupo existe
      let group = form.get(input.group) as FormGroup;
      if (!group) {
        group = new FormGroup({});
        form.addControl(input.group, group);
      }

      // ?Agregar los controles a su respectivo FormGroup
      group.addControl(input.formControlName, control);
    });
  }

  /**
   * ?Transforma una lista de validadores definidos en una interfaz en validadores de Angular.
   *
   * ?Este método toma un arreglo de objetos que representan validadores y devuelve un
   * ?arreglo de validadores correspondientes que pueden ser utilizados en un FormGroup
   * ?o FormControl. Los tipos de validadores soportados son:
   * *- 'required': Valida que el campo no esté vacío.
   * *- 'email': Valida que el valor sea un correo electrónico válido.
   * *- 'min': Valida que el valor sea mayor o igual que el valor especificado.
   * *- 'max': Valida que el valor sea menor o igual que el valor especificado.
   * *- 'minLength': Valida que la longitud del valor sea mayor o igual que la longitud especificada.
   * *- 'maxLength': Valida que la longitud del valor sea menor o igual que la longitud especificada.
   * *- 'pattern': Valida que el valor coincida con un patrón especificado mediante una expresión regular.
   *
   * *@param validators - Un arreglo de validadores definidos en la interfaz `InterfaceValidator`.
   * *@returns Un arreglo de validadores de Angular que pueden ser utilizados en formularios.
   */
  private getValidators(validators: InterfaceValidator[]): any[] {
    return validators
      .map((validator: InterfaceValidator) => {
        switch (validator.type) {
          case 'required':
            return Validators.required;
          case 'email':
            return Validators.email;
          case 'min':
            return Validators.min(validator.value);
          case 'max':
            return Validators.max(validator.value);
          case 'minLength':
            return Validators.minLength(validator.value);
          case 'maxLength':
            return Validators.maxLength(validator.value);
          case 'pattern':
            return Validators.pattern(new RegExp(validator.value));
          default:
            return null;
        }
      })
      .filter((validator) => validator !== null);
  }

  /**
   * ?Obtiene un grupo de controles de formulario a partir del formulario principal.
   * ?Si el grupo no existe, se devuelve un nuevo FormGroup vacío.
   *
   * *@param form - El FormGroup principal.
   * *@param groupName - El nombre del grupo a obtener.
   * *@returns El FormGroup correspondiente al nombre del grupo.
   */
  getGroup(form: FormGroup, groupName: string): FormGroup {
    const group = form.get(groupName) as FormGroup;
    return group ? group : new FormGroup({});
  }

  /**
   * ?Obtiene el grupo de controles actual basado en el índice del paso activo.
   *
   * *@param form - El FormGroup principal.
   * *@param activeStepIndex - El índice del paso activo.
   * *@returns El FormGroup correspondiente al paso activo.
   */
  getCurrentGroup(form: FormGroup, activeStepIndex: number): FormGroup {
    const groupNames = this.getGroupNames();
    return this.getGroup(form, groupNames[activeStepIndex]);
  }

  /**
   * ?Obtiene una lista de nombres de grupos únicos a partir de los datos del archivo JSON.
   *
   * *@returns Un array de nombres de grupos únicos.
   */
  private getGroupNames(): string[] {
    const uniqueGroups = new Set<string>();
    formInputs.forEach((input) => uniqueGroups.add(input.group));
    return Array.from(uniqueGroups);
  }
}
