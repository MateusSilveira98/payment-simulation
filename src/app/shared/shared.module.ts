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
  ]
})
export class SharedModule {}
