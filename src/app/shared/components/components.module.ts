import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';

@NgModule({
  declarations: [UserCardComponent],
  imports: [
    MaterialModule
  ],
  exports: [
    UserCardComponent
  ]
})
export class ComponentsModule {}
