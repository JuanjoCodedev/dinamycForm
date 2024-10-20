# Formulario Dinámico y Reactivo con Pasos en Angular

Este proyecto demuestra un formulario dinámico y reactivo en Angular, dividido en múltiples pasos utilizando p-steps de PrimeNG. Es ideal para aplicaciones donde los formularios requieren ser flexibles, permitiendo agregar o modificar campos fácilmente a través de un archivo JSON.

## Características

- **Formulario Dinámico:** Los campos del formulario son generados dinámicamente a partir de un archivo JSON.
- **Formularios Reactivos:** Utiliza `FormGroup` y `FormControl` para manejar formularios reactivos en Angular.
- **Navegación por Pasos:** Implementación de un sistema de pasos utilizando el componente `p-steps` de PrimeNG.
- **Validación del Formulario:** Validación y agrupamiento de campos usando `FormGroup` por secciones.
- **Componentes Personalizados:** Utilización de componentes para cada sección del formulario.

## Estructura del Proyecto

```
/src
  /app
    /forms
      /basic-data
        basic-data.component.ts
      /delivery
        delivery.component.ts
      /pqr
        pqr.component.ts
    /shared
      /interfaces
        formInput.interface.ts
    /steps
      steps.component.ts
    form-inputs.json
```

### Componentes

1. **`BasicDataComponent`**: Maneja los datos básicos del usuario como nombre, correo y contraseña.
2. **`DeliveryComponent`**: Maneja la información de la dirección de entrega.
3. **`PqrComponent`**: Maneja el formulario de quejas y reclamos.
4. **`StepsComponent`**: Componente principal que administra la navegación entre los pasos.

## Dependencias

El proyecto utiliza las siguientes dependencias principales:

- **Angular**: Para la construcción de la aplicación.
- **ReactiveFormsModule**: Para el manejo de formularios reactivos.
- **PrimeNG**: Para los componentes de UI como `p-steps` y `p-button`.

## Instalación

1. Clona este repositorio.

   ```bash
   git clone https://github.com/JuanjoCodedev/dinamycForm.git
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Ejecuta el proyecto:
   ```bash
   ng serve
   ```

## Configuración del Formulario

La estructura del formulario está definida en el archivo JSON (form-inputs.json). Este archivo contiene la configuración de los campos para cada sección del formulario.

```json
[
  {
    "type": "text",
    "placeholder": "Ingresa tu nombre",
    "formControlName": "nombre",
    "group": "basicData"
  },
  {
    "type": "email",
    "placeholder": "Ingresa tu correo",
    "formControlName": "email",
    "group": "basicData"
  },
  {
    "type": "password",
    "placeholder": "Ingresa tu contraseña",
    "formControlName": "password",
    "group": "basicData"
  },
  {
    "type": "text",
    "placeholder": "Ingresa tu Carrera",
    "formControlName": "cra",
    "group": "delivery"
  },
  {
    "type": "text",
    "placeholder": "Ingresa tu Calle",
    "formControlName": "calle",
    "group": "delivery"
  },
  {
    "type": "text",
    "placeholder": "Ingresa tu Barrio",
    "formControlName": "barrio",
    "group": "delivery"
  },
  {
    "type": "text",
    "placeholder": "Selecione un tipo",
    "formControlName": "tipo",
    "group": "pqr"
  },
  {
    "type": "textarea",
    "placeholder": "Ingrese su comentario",
    "formControlName": "comentario",
    "group": "pqr"
  }
]
```

### Estructura de Campos

- **type**: Define el tipo de input (`text`, `email`, `password`, etc.).
- **placeholder**: Texto de ejemplo que se muestra en el campo.
- **formControlName**: Nombre del control que se usará para identificar el campo en el `FormGroup`.
- **group**: El grupo de formulario al que pertenece el campo.

## Integrar Nuevos Grupos

Para agregar un nuevo grupo de campos al formulario, sigue estos pasos:

### 1. Definir Nuevos Campos en el Archivo JSON

Agrega los nuevos campos en el archivo `form-inputs.json`. Cada campo debe especificar su `formControlName`, `group`, y otros atributos como `type` y `placeholder`.

Ejemplo para agregar un grupo de facturación:

```json
[
  {
    "type": "text",
    "placeholder": "Ingresa tu tarjeta de crédito",
    "formControlName": "creditCard",
    "group": "billingInfo"
  },
  {
    "type": "text",
    "placeholder": "Ingresa tu dirección de facturación",
    "formControlName": "billingAddress",
    "group": "billingInfo"
  }
]
```

### 2. Actualizar el Formulario en el Componente Padre

En el componente `StepsComponent`, el método `_initForm()` se encarga de crear los grupos de formulario y sus controles dinámicamente a partir del archivo JSON. No es necesario hacer cambios adicionales en este método para que reconozca nuevos grupos.

```typescript
private _initForm(): void {
  this.inputs.forEach((input: InterfaceFormInput) => {
    const control = new FormControl('');
    let group = this.form.get(input.group) as FormGroup;

    if (!group) {
      group = new FormGroup({});
      this.form.addControl(input.group, group);
    }

    group.addControl(input.formControlName, control);
  });
}
```

### 3. Crear un Componente para el Nuevo Grupo

Crea un nuevo componente que represente el grupo de campos. Por ejemplo, para el grupo `billingInfo`, puedes crear un componente `BillingInfoComponent`.

```typescript
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

/* PrimeNg */
import { InputTextModule } from 'primeng/inputtext';

/* Interfaces */
import { InterfaceFormInput } from '../../shared/interfaces/formInput.interface';

@Component({
  selector: 'app-billing-info',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './billing-info.component.html',
  styleUrls: ['./billing-info.component.css'],
})
export class BillingInfoComponent {
  @Input() formBilling!: FormGroup;
  @Input() inputs: InterfaceFormInput[] = [];

  get billingInputs(): InterfaceFormInput[] {
    return this.inputs.filter((input: InterfaceFormInput) => input.group === 'billingInfo');
  }
}
```

y el template del componente `BillingInfoComponent`

```html
<section class="bg-blue-50 flex justify-content-center flex-wrap" [formGroup]="formBilling">
  <div class="w-6 p-4 flex flex-column gap-4">
    @for (input of billingInputs; track $index) {
    <div class="flex flex-column gap-2">
      <input pInputText [type]="input.type" [placeholder]="input.placeholder" [formControlName]="input.formControlName" />
    </div>
    }
  </div>
</section>
```

### 4. Acceso a Grupos Específicos del Formulario

Define un getter en el componente padre para acceder al nuevo grupo.

```typescript
get billingGroup(): FormGroup {
  return this.form.get('billingInfo') as FormGroup;
}
```

### 5. Modificar el Template del Componente Padre

Agrega el nuevo componente a las importaciones:

```typescript
imports: [..., BillingInfoComponent, ...];
```

Actualiza el template del componente `StepsComponent` para incluir el nuevo componente dentro de los pasos.

```html
<ng-container>
  @if (activeStepIndex === 3){
  <app-billing-info [formBilling]="billingGroup" [inputs]="inputs"></app-billing-info>
  }
</ng-container>
```

Asegúrate también de agregar el nuevo paso en el componente:

```typescript
steps = [{ label: 'Datos del usuario' }, { label: 'Dirección de entrega' }, { label: 'Quejas' }, { label: 'Pagos' }];
```

## Envío del Formulario

Cuando se completa el formulario, se envía toda la información agrupada mediante la función `onSubmit`:

```typescript
onSubmit() {
  console.log(this.form.value);
}
```

## Contribuciones

Las contribuciones son bienvenidas. Si deseas mejorar alguna funcionalidad o agregar nuevas características, puedes hacer un pull request.
