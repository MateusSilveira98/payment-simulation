import { FormControlValidatorMessageService } from './services/form-control-validator-message.service';
import { UserService } from './services/user/user.service';
import { TransactionService } from './services/transaction/transaction.service';
import { NgModule } from '@angular/core';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';

@NgModule({
  declarations: [],
  imports: [
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
    FormControlValidatorMessageService
  ]
})
export class SharedModule {}
