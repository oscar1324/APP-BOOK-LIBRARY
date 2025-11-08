import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpBookService } from '../features/services/HttpBookService';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    HttpBookService
  ]
})

export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule ya ha sido cargado. Importarlo solo en AppModule.');
    }
  }
}

