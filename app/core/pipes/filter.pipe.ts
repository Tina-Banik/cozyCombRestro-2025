import { Pipe, PipeTransform } from '@angular/core';
import { retry } from 'rxjs';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform( foodLists:any, search_food:any): any {
    if (!foodLists || !search_food) {
      return foodLists;
    }
    let result = foodLists.filter((item:any)=>{
      return item.food.toLowerCase().includes(search_food.toLowerCase());
    })
    return result;
  }

}
