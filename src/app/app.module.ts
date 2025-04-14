import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { FundoFormComponent } from './components/fundo-form/fundo-form.component';
import { FundoListComponent } from './components/fundo-list/fundo-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';
import { CurrencyMaskModule } from "ng2-currency-mask";
import { ErrorComponent } from './components/error/error.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotImplementedComponent } from './components/not-implemented/not-implemented.component';

@NgModule({
  declarations: [
    AppComponent,
    FundoFormComponent,
    FundoListComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    ErrorComponent,
    NotImplementedComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgxMaskModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
