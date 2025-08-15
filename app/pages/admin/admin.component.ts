import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/core/services/admin/admin.service';
import { FoodService } from 'src/app/core/services/food/food.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit{
   public foodLists:any = [];
    public foodForm:any = [];
    item:any = [];
    isView:boolean = false;
    adminInfo:any =[];
    constructor(private fService:FoodService, public fBuilder:FormBuilder, private adminService:AdminService, private route:Router){ 
    this.foodForm = this.fBuilder.group({
      food:[ '', [Validators.required, Validators.pattern('^[a-zA-Z ]{3,30}$')],
      ],
      description:[ '', [Validators.required, Validators.pattern('^.{5,1000}$')],
      ],
      price:[ '', [Validators.required, Validators.pattern('^[0-9]{2,3}$')],
      ],
      image:[''],
      stock:[ '', [Validators.required, Validators.pattern('^[0-9]{1,3}')]
      ]
    })
  }
  ngOnInit(): void {
    this.getAllItems();
    this.getUserDataFromLocal();
  }
  /**get user data from the local */
    getUserDataFromLocal(){
      console.log(localStorage.getItem("adminInfo"));
      this.adminInfo = JSON.parse(localStorage.getItem("adminInfo") || '[]');
      // console.log( "The admin info: " , JSON.stringify(this.adminInfo, null, 2));
      console.log("the admin info :", this.adminInfo);
    }
    /**logout api call */
    logout(){
      console.log("the logout button is hit");
      this.adminService.logoutAdmin()?.subscribe({
        next:(()=>{
            alert(`${this.adminInfo.activeUser} is logout successfully..`);
            localStorage.removeItem("adminInfo");
            this.route.navigateByUrl('/login');
        }),
        error:((error:any)=>{
          console.log("Error during the logout :", error);
        }),
        complete:(()=>{
          console.log("The admin logout api call");
        })
      })
    }
  /**get all the food items */
  getAllItems(){
    this.fService.getAllFoods().subscribe({
      next:((res:any)=>{
        console.log(res);
        this.foodLists = res['result'];
        console.log(this.foodLists);
      }),
      error:((err:any)=>{
        console.log(err);
      }),
      complete:(()=>{
        console.log("The foods are displayed successfully!!!..");
      })
    })
  }
  /**for the image validation*/
  checkTypeFile(type:any){
    if(type == 'image/jpeg' || type == 'image/png' || type == 'image/jpg'){
      return true;
    }else{
      return false;
    }
  }
  setFile(event:any){
    console.log(event);
    let file = event.target.files[0];
    console.log("The file : ", file , file.type);
    if(this.checkTypeFile(file.type)){
      this.foodForm.get('image').setValue(file);
    }
  }
    /**add the food items */ 
    addNew(){
      // console.log("The added items in the food lists..");
      // console.log(this.foodForm.value);
      let form = new FormData();
      form.append('food', this.foodForm.get('food').value);
      form.append('description', this.foodForm.get('description').value);
      form.append('price', this.foodForm.get('price').value);
      form.append('image',this.foodForm.get('image').value);
      form.append('stock',this.foodForm.get('stock').value);
      console.log('The food items are :', form);
      this.fService.addNewItem(form).subscribe({
        next:((res:any)=>{
          console.log(res);
          this.getAllItems();
        }),
        complete:(()=>{
          console.log("The food items added api successfully..")
        }),
        error:((err:any)=>{
          console.log("The error:", err);
        })
      })
    }
    view(){
      this.isView = false;
      this.foodForm.reset();
    }
    /**update the food items */
    setValue(f:any){
      console.log(f);
      this.isView = true;
      console.log("The food data which I want to update:", f._id);
      this.item = f;
      console.log(this.item);
      /**here we set the value into the food form */
      this.foodForm.get('food').setValue(this.item.food);
      this.foodForm.get('description').setValue(this.item.description);
      this.foodForm.get('price').setValue(this.item.price);
      this.foodForm.get('image').setValue(this.item.image);
      this.foodForm.get('stock').setValue(this.item.stock);
    }
    update(){
      console.log("The food updating works..")
      console.log(this.foodForm.value);
      let form = new FormData();
      let food = this.foodForm.value; // it holds the whole form value
      Object.keys(food).forEach((f_obj:any)=>{
        // console.log(f_obj); // it gives the all the keys
        form.append(f_obj, food[f_obj]) ; // food[f_obj]= it give the value, f_obj:key
      })
      console.log("the food items :", form);
      /**update the api call */
      this.fService.updateNewItem(this.item._id,form).subscribe({
        next:((res:any)=>{
          console.log(res);
          this.getAllItems();
        }),
        error:((err:any)=>{
          console.log("the error:", err);
        }),
        complete:(()=>{
          console.log("the update api called successfully..");
        })
      })
    }
  /** delete the food items */
  delete(f:any){
    console.log(f);
    let _id =f._id;
    console.log("the food id : ", _id);
    /**here I call the delete api */
      let conf = confirm("Are you sure you want to delete this food items from your food lists ??? ");
      if(conf){
        this.fService.deleteItemById(_id).subscribe({
            next:((res:any)=>{
              console.log(res);
              this.getAllItems();
            }),
            error:((err:any)=>{
              console.log(err);
            }),
            complete:(()=>{
                console.log("The delete api is called successfully..");
            })
        })
      }
  }
}