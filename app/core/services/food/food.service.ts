import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  // all foods related apis are here
  constructor(private http:HttpClient) { }
  private _url:string = ' https://cozycombrestro.glitch.me/api/v1/food';
  getFoodId(_id:any){
    return this.http.get(`${this._url}/${_id}`)
  }
  getAllFoods(){
    return this.http.get(`${this._url}/get-all-food-lists`);
  }
  addNewItem(foodData:any){
    return this.http.post(`${this._url}/add-new-food`, foodData);
  }
  updateNewItem(_id:any, foodData:any){
    return this.http.put(`${this._url}/update-food-details/${_id}`, foodData);
  }
  deleteItemById(_id:any){
    return this.http.delete(`${this._url}/delete-food/${_id}`);
  }
}
