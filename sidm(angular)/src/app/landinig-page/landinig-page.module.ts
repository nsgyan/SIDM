import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandinigPageRoutingModule } from './landinig-page-routing.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    LandinigPageRoutingModule
  ]
})
export class LandinigPageModule { }
