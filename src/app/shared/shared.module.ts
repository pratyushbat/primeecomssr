import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageslidercomponentComponent } from './components/imageslidercomponent/imageslidercomponent.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PheaderComponent } from '../components/extra/panto/pheader/pheader.component';
import { RouterModule } from '@angular/router';
import { DynamicClassDirective } from '../directive/attribute-directive/dynamicclassdirective';
import { InputClassDirective } from '../directive/attribute-directive/inputdirective';
import { HighlightDirective } from '../directive/attribute-directive/highlight.directive';
import { CustomInputComponent } from '../components/custom/custominput.component';



@NgModule({
  declarations: [
    ImageslidercomponentComponent,
    DynamicClassDirective,
    InputClassDirective,
    HighlightDirective,
    CustomInputComponent

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    DynamicClassDirective,
    HighlightDirective,
    InputClassDirective,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageslidercomponentComponent,
    CustomInputComponent

  ]
})
export class SharedModule { }
