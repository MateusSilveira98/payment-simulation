import { Component, Inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControlValidatorService } from '../../services/form-control-validator/form-control-validator.service';
import { Card } from './../../../core/domain/card/Card.domain';
import { User } from './../../../core/domain/user/User.domain';

export interface TransactionForm {
  user: User;
  cards: Card[];
  value: string | number;
  card_number: string;
}

@Component({
  selector: 'app-transaction-form-modal',
  templateUrl: './transaction-form-modal.component.html',
  styleUrls: ['./transaction-form-modal.component.scss'],
})
export class TransactionFormModalComponent implements OnInit {
  cards: Card[];
  user: User;
  transactionForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private validatorService: FormControlValidatorService,
    public dialogRef: MatDialogRef<TransactionFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TransactionForm
  ) {}

  ngOnInit() {
    this.cards = this.data.cards || [];
    this.user = this.data.user;
    this.transactionForm = this.formBuilder.group({
      value: [this.data.value || 0, [Validators.required, Validators.min(1)]],
      card_number: [this.data.card_number, Validators.required],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      this.dialogRef.close(this.transactionForm.value);
    }
  }

  getLastFourNumbers(cardNumber: string): string {
    const lastFourNumbers = cardNumber.slice(
      cardNumber.length - 5,
      cardNumber.length - 1
    );
    return lastFourNumbers;
  }

  getErrorMessage(control: AbstractControl, formFieldName: string) {
    return this.validatorService.findError(control, formFieldName);
  }
}
