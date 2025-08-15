import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
  constructor(private http:HttpClient,private route:Router) { }
  private _url:string = 'https://cozycombrestro.glitch.me/api/v1/user';
  registerAdmin(adminData:any){
    return this.http.post(`${this._url}/admin-register`,adminData);
  }
  loginAdmin(adminData:any){
    return this.http.post(`${this._url}/admin-login`, adminData);
  }
  logoutAdmin(){
    // const adminInfo = JSON.parse(localStorage.getItem("adminInfo") || '[]');
    // console.log("The admin info in service profile :", adminInfo._refreshToken);
    // const _refreshToken = adminInfo._refreshToken;
    // console.log("Admin's refresh token on logout::", _refreshToken);
    // if( !_refreshToken){
    //    this.route.navigateByUrl('/login');
    //    return null
    // }
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${_refreshToken}`
    // })
    return this.http.post(`${this._url}/admin-logout`,{}); 
  }
}
