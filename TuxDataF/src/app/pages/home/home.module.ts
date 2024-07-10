import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { AboutComponent } from './about/about.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbCarouselModule,
    FormsModule
  ]
})
export class HomeModule { }
