import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }
  private _url:string = "https://cozycombrestro.glitch.me/api/v1/order";
  addToCart(user_id:string,food_id:string,quantity:number){
    return this.http.post(`${this._url}/add-to-cart `,{user_id,food_id,quantity});
  }
  /**get the cart */
  // getCart(order_id:string){
  //   return this.http.get(`${this._url}/get-cart/${order_id}`)
  // }
  /**fetch the cart by user id */
  fetchCartByUserId(userId:string){
    return this.http.get(`${this._url}/get-cart-by-user/${userId}`)
  }
  generateBillInfo(order_id:string){
    return this.http.get(`${this._url}/bill-info/${order_id}`);
  }
}
