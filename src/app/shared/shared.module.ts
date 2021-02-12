import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { FormControlValidatorService } from './services/form-control-validator/form-control-validator.service';
import { TransactionService } from './services/transaction/transaction.service';
import { UserService } from './services/user/user.service';

@NgModule({
  exports: [
    ComponentsModule
  ],
  providers: [
    TransactionService,
    UserService,
    FormControlValidatorService
  ]
})
export class SharedModule {}
