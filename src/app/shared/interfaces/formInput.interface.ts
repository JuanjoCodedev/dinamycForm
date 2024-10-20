export interface InterfaceFormInput {
  type: string;
  placeholder: string;
  formControlName: string;
  group: string;
  options?: { label: string; value: any }[];
  validators?: InterfaceValidator[];
}

export interface InterfaceValidator {
  type: string;
  value?: any;
  message: string;
}
