import { ApiService } from 'src/app/core/services/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HttpClientModule],
  providers: [HttpClientModule, ApiService],
})
export class CoreModule { }
