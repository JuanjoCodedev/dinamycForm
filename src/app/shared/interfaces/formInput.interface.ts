export interface InterfaceFormInput {
  type: string;
  placeholder: string;
  formControlName: string;
  group: string;
  options?: { label: string; value: any }[];
}
