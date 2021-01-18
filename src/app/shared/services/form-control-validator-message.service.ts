import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FormControlValidatorMessageService {
  constructor() {}

  findError(control: FormControl, formFieldName: string): string {
    return (
      (control.errors.min && this.getMinErrorMessage(control, formFieldName)) ||
      (control.errors.required && this.getRequiredMessage(formFieldName))
    );
  }

  getMinErrorMessage(control: FormControl, formFieldName: string): string {
    return `${formFieldName} deve ser maior que ${control.errors.min.min}`;
  }

  getRequiredMessage(formFieldName: string): string {
    return `O campo ${formFieldName} é obrigatório`;
  }
}
