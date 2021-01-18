import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormControlValidatorMessageService {
  constructor() {}

  findError(control: AbstractControl, formFieldName: string): string {
    return (
      (control.errors.min && this.getMinErrorMessage(control, formFieldName)) ||
      (control.errors.required && this.getRequiredMessage(formFieldName))
    );
  }

  getMinErrorMessage(control: AbstractControl, formFieldName: string): string {
    return `${formFieldName} deve ser maior que ${control.errors.min.min}`;
  }

  getRequiredMessage(formFieldName: string): string {
    return `O campo ${formFieldName} é obrigatório`;
  }
}
