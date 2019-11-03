import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DisasterService } from './disaster.service';
import { CharityService } from './charity.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [DisasterService, CharityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
