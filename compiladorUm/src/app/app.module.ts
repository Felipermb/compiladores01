import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PosfixaComponentComponent } from './posfixa-component/posfixa-component.component';
import { ServicoAlgoritmoService } from './posfixa-component/servico-algoritmo.service';

@NgModule({
  declarations: [
    AppComponent,
    PosfixaComponentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ServicoAlgoritmoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
