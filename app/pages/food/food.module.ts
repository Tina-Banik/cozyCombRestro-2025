import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoodRoutingModule } from './food-routing.module';
import { FoodComponent } from './food.component';

import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/core/pipes/filter.pipe';
@NgModule({
  declarations: [
    FoodComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FoodRoutingModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class FoodModule { }
