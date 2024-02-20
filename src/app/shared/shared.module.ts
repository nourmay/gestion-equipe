import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DestoryComponent } from './destroy/destroy.component';
import { TeamCrudService } from './services/team-crud.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [DestoryComponent],
  providers: [TeamCrudService],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ],
    exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ]
})
export class SharedModule { }
