import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import 'hammerjs';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatSliderModule } from "@angular/material/slider";
import {
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatStepperModule,
  MatCardModule,
  MatButtonModule,
  MatRippleModule,
  MatTooltipModule,
  MatDialogModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatMenuModule,
  MatSelect,
  MatSelectModule
} from "@angular/material";

import { DragDropModule } from "@angular/cdk/drag-drop";
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    DragDropModule,
    MatMenuModule,
    MatSelectModule
  ],
  exports: [
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatStepperModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    DragDropModule,
    MatMenuModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
