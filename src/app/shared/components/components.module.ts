import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { REAL_CURRENCY_MASK_CONFIG } from './../constants/CurrencyConfig.const';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxCurrencyModule } from 'ngx-currency';
import { MaterialModule } from './../material/material.module';
import { TransactionFormModalComponent } from './transaction-form-modal/transaction-form-modal.component';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [UserCardComponent, TransactionFormModalComponent],
  entryComponents: [TransactionFormModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgxCurrencyModule.forRoot(REAL_CURRENCY_MASK_CONFIG),
    MaterialModule,
  ],
  exports: [UserCardComponent],
})
export class ComponentsModule {}
