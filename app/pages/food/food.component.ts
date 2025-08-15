import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/core/services/food/food.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css']
})
export class FoodComponent implements OnInit{
  constructor(private fService:FoodService){ }
  /**get all the foods lists */
  public foodLists:any = [];
  pageSize:number = 3;
  p:number = 1;
  totalSize:number = 0;
  search_food:any = '';
  ngOnInit(): void {
    this.getAllFoodItems();
  }
  getAllFoodItems(){
    this.fService.getAllFoods().subscribe({
      next:((res:any)=>{
        console.log(res);
        this.foodLists = res['result'];
        this.totalSize =  res.length;
        console.log(this.foodLists);
      }),
      error:((error:any)=>{
        console.log(error);
      }),
      complete:(()=>{
        console.log("The get api called success fully")
      })
    })
  }
}
