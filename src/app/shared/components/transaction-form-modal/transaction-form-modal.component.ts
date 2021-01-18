import { FormControlValidatorMessageService } from '../../services/form-control-validator-message.service';
import { User } from './../../../core/domain/user/User.domain';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TransactionForm } from 'src/app/core/domain/transaction/TransactionForm.domain';
import { Card } from './../../../core/domain/card/Card.domain';

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
    private validatorMessageService: FormControlValidatorMessageService,
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
    const lastFourNumbers = cardNumber.slice(cardNumber.length - 5, cardNumber.length - 1);
    return lastFourNumbers;
  }

  getErrorMessage(control: AbstractControl, formFieldName: string) {
    return this.validatorMessageService.findError(control, formFieldName);
  }
}
