import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  /**user api call */
  private _url:string = "https://cozycombrestro.glitch.me/api/v1/user";
  getUser(){
    return this.http.get(`${this._url}/user-information`);
  }
  registerUser(userData:any){
    return this.http.post(`${this._url}/user-register`, userData);
  }
  loginUser(userData:any){
    return this.http.post(`${this._url}/user-login`, userData);
  }
  logoutUser(){
    return this.http.post(`${this._url}/user-logout`,{})
  }
}
