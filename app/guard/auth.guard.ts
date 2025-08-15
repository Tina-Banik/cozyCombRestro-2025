import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  console.log("Auth guard is run..");
  let getToken = function (){
    let admin = JSON.parse(localStorage.getItem("adminInfo") || "[]");
    console.log("the admin auth guard" , admin);
    return admin._accessToken;
  }
  console.log(getToken());
  if(!getToken()){
    alert("You have no permission to visit this path");
    let route = inject(Router);
    route.navigateByUrl("/login");
    return false;
  }
  return true;
};
// 
// _accessToken 
// _refreshToken
