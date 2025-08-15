import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userauthGuard: CanActivateFn = (route, state) => {
  console.log("user auth guard is run..");
  let getToken = function(){
    let token = JSON.parse(localStorage.getItem("userInfo") || "[]");
    console.log("The user auth guard token :", token);
    return token._accessToken;
  }
  console.log(getToken());
  if(!getToken()){
    alert("You have no permission to visit this path..");
    let route = inject(Router);
    route.navigateByUrl("/login");
    return false;
  }
  return true;
};
