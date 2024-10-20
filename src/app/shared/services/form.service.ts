import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

/* Archivo JSON */
import formInputs from '../../form-inputs.json';

/* Interfaces */
import { InterfaceFormInput } from '../interfaces/formInput.interface';

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
      const control = new FormControl('');

      // ?Para Verificar si el subgrupo existe
      let group = form.get(input.group) as FormGroup;
      if (!group) {
        group = new FormGroup({});
        form.addControl(input.group, group);
      }

      // ?PAra Agregar los controles a su respectivo FormGroup
      group.addControl(input.formControlName, control);
    });
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
