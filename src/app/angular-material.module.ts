import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule
         } from '@angular/material';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule
  ]
})
export class AngularMaterialModule { }
