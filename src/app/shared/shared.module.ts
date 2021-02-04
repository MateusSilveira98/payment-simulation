import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControlValidatorService } from './services/form-control-validator/form-control-validator.service';
import { UserService } from './services/user/user.service';
import { TransactionService } from './services/transaction/transaction.service';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [
    BrowserAnimationsModule,
    MaterialModule,
    ComponentsModule
  ],
  exports: [
    MaterialModule,
    ComponentsModule
  ],
  providers: [
    TransactionService,
    UserService,
    FormControlValidatorService
  ]
})
export class SharedModule {}
