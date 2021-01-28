import { Card } from './../../../core/domain/card/Card.domain';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControlValidatorMessageService } from './../../services/form-control-validator-message.service';
import { SharedModule } from './../../shared.module';
import {
  TransactionForm,
  TransactionFormModalComponent,
} from './transaction-form-modal.component';

const cards: Card[] = [
  // valid card
  {
    card_number: '1111111111111111',
    cvv: 789,
    expiry_date: '01/18',
  },
  // invalid card
  {
    card_number: '4111111111111234',
    cvv: 123,
    expiry_date: '01/20',
  },
];
describe('TransactionFormModalComponent', () => {
  let component: TransactionFormModalComponent;
  let fixture: ComponentFixture<TransactionFormModalComponent>;
  let element: DebugElement;

  let formBuilder: any;
  let validatorMessageService: any;
  let dialogRef: any;

  const data: TransactionForm = {
    cards,
    card_number: '1111111111111111',
    value: '123',
    user: {
      id: 1,
      img: 'url',
      name: 'mock',
      username: 'mock@mock',
    },
  };

  beforeEach(async(() => {
    const formBuilderSpy = jasmine.createSpyObj('FormBuilder', ['group']);
    const validatorMessageServiceSpy = jasmine.createSpyObj(
      'FormControlValidatorMessageService',
      ['findError']
    );
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: FormBuilder, useValue: formBuilderSpy },
        {
          provide: FormControlValidatorMessageService,
          useValue: validatorMessageServiceSpy,
        },
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(TransactionFormModalComponent);
        component = fixture.componentInstance;
        element = fixture.debugElement;
        formBuilder = TestBed.get(FormBuilder);
        validatorMessageService = TestBed.get(
          FormControlValidatorMessageService
        );
        dialogRef = TestBed.get(MatDialogRef);
      });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
