import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public registerForm:any = [];
  public loginForm:any = [];
  // public isAdmin:boolean = false;
  constructor(public fBuilder:FormBuilder, private adminService:AdminService, private userService:UserService, private route:Router){
    this.registerForm = this.fBuilder.group({
      username:['', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,30}$')]
    ],
    email:['',[Validators.required, Validators.pattern('^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,4}$')]
    ],
    passwords:['',[Validators.required, Validators.pattern('^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,30}$')]
    ],
    roles:['user',[Validators.required]] //Default role is 'user'
    }),
    this.loginForm = this.fBuilder.group({
      email:['', [Validators.required]
      ],
      passwords:['',[Validators.required]
      ]
    })
  }
  /**register api call  */
  onSubmit(){
    console.log("the register");
    if(this.registerForm.valid){
      console.log("the admin");
      if(this.registerForm.value.roles === "admin"){
          console.log("the separate admin..");
          this.adminService.registerAdmin(this.registerForm.value).subscribe({
            next:((response:any)=>{
              console.log("Admin registered successfully.." , response);
            }),
            error:((err:any)=>{
              console.log("Error during admin registration..",err);
              alert(err.error.message);
            }),
            complete:(()=>{
              console.log("The admin register api called successfully...");
            })
          })
      }else{
          this.userService.registerUser(this.registerForm.value).subscribe({
            next:((response:any)=>{
              console.log("Users registered successfully.." , response);
            }),
            error:((error:any)=>{
              console.log("Error during user registration..", error);
            }),
            complete:(()=>{
                console.log("The user api called is successfully...");
            })
          })
      }
    }
  }
  /**login api call */
  // setAdminLogin(isAdmin:boolean){
  //   this.isAdmin = isAdmin;
  //   console.log("the admin login is set to : ", this.isAdmin);
  // }
  // onLogin(){
  //   console.log("the login");
  //   if(this.loginForm.valid){
  //     console.log("the valid login form");
  //     console.log("The isAdmin flag:", this.isAdmin);
  //     if(this.isAdmin){
  //       console.log("The is admin : " , this.isAdmin);
  //       this.adminService.loginAdmin(this.loginForm.value).subscribe({
  //         next:(response:any)=>{
  //           console.log("the admin is logged is successfully.." , response);
  //           // alert(response['message']);
  //           if(response.roles === 'admin'){
  //             this.isAdmin = true;
  //             let adminUser = {
  //               activeUser:response.email,
  //               _accessToken:response._accessToken,
  //               _refreshToken:response._refreshToken
  //             }
  //             console.log("The active admin info :", adminUser);
  //             /**set the admin info into the local storage */
  //             localStorage.setItem("adminInfo", JSON.stringify(adminUser));
  //              this.route.navigateByUrl('/admin');
  //           }else{
  //             console.log("you are not admin.");
  //             this.isAdmin = false;
  //           }
  //         },
  //         complete:(()=>{
  //             console.log("The admin login api is called successfully..");
  //         }),
  //         error:((error:any)=>{
  //             console.log("The error during the admin login", error.message);
  //         })
  //       })
  //     }else{
  //       console.log("the users sections:", !this.isAdmin);
  //       this.userService.loginUser(this.loginForm.value).subscribe({
  //         next:((response:any)=>{
  //           console.log("The user is logged in successfully..", response);
  //           /**here we store the information in a local storage */
  //           if(response.roles === "user"){
  //             let userInfos = {
  //               activeUser:response.email,
  //               _accessToken: response._accessToken,
  //               _refreshToken:response._refreshToken
  //           };
  //           console.log("The active user is :", userInfos);
  //           localStorage.setItem("userInfo", JSON.stringify(userInfos));
  //           /**here I redirect to the user api */
  //           this.route.navigateByUrl('/user');
  //           } 
  //         }),
  //         complete:(()=>{
  //           console.log("the user login api is called successfully..");
  //         }),
  //         error:((error:any)=>{
  //           console.log("The error during the user api call..", error.message);
  //         })
  //       })
  //     }
  //   }else {
  //     console.log("The login form is invalid");
  // }
  // }
  onLogin(){
    console.log("The login form for the user and admin api..");
    if(this.loginForm.valid){
      console.log("the login form is valid..");
      this.adminService.loginAdmin(this.loginForm.value).subscribe({
        next:((response:any)=>{
          console.log(response);
          if(response.roles === 'admin'){
            let adminUser = {
              activeUser: response.email,
              _accessToken:response._accessToken,
              _refreshToken:response._refreshToken
            };
            console.log("the admin info adminUser :", adminUser);
            alert(response['message']);
            localStorage.setItem("adminInfo", JSON.stringify(adminUser));
            this.route.navigateByUrl('/admin');
          }else if(response.roles === 'user'){
            let regularUser = {
              activeUser:response.email,
              _accessToken:response._accessToken,
              _refreshToken:response._refreshToken
            };
            alert(response['message']);
            localStorage.setItem("userInfo",JSON.stringify(regularUser));
            this.route.navigateByUrl("/user");
          }else{
            console.error("The unexpected error : ", response.roles);
          }
        }),
        complete:(()=>{
          console.log("the login api is called successfully..");
        }),
        error:((error:any)=>{
            console.error("Error during the login api..", error.message);
        })
      })
    }
   }
}
