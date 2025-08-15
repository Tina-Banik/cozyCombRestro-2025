import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FoodService } from 'src/app/core/services/food/food.service';
import { OrderService } from 'src/app/core/services/order/order.service';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit{
     constructor(private userService:UserService, private route:Router, private fService:FoodService, private oService:OrderService){}
    public userInfo: any = [];
    public foodItems:any=[];
    userId:string= '';
    quantity:number = 1;
    cartItems:any[]=[];
    isCartVisible:boolean = false;
    errorMessage: string = '';
    cart_id:any='';
    // isFlag:boolean = false;
    ngOnInit(): void {
      this.getUsersDataFromLocal();
      this.getAllFoodItems();
      this.getUserDetails();
      this.loadCartOnLogin()
    }
    getAllFoodItems(){
      /**here I call the all the food lists */
      this.fService.getAllFoods().subscribe({
        next:((response:any)=>{
          console.log("All the food lists are here : ", response);
          this.foodItems = response['result'];
          console.log("The food lists:", this.foodItems);
        }),
        complete:(()=>{
          console.log("The all the food lists api called successfully..")
        }),
        error:((error:any)=>{
          console.log("Error for displaying all the food items :", error);
        })
      })
    }
    /**get the user details */
    getUserDetails(){
      this.userService.getUser().subscribe({
        next:((user:any)=>{
            // console.log("The current user information : ", user);
            this.userId = user.info;
            console.log("The current user information : ", this.userId);
            this.loadCartOnLogin();
        }),
        error:((error:any)=>{
            console.log("Error during the fetch the information..", error);
        })
      })
    }
    showCart(){
      this.isCartVisible = !this.isCartVisible;
      console.log("Cart visibility toggled:", this.isCartVisible);
      console.log("The cart items are :", this.cartItems);
  }
    /**add to the cart */
    addToCart(f:any){
      console.log("Add to cart", f);
      let _foodId = f._id;
      console.log("The food id for adding to the cart for that users :", _foodId , this.userId); 
      this.oService.addToCart(this.userId, _foodId, this.quantity).subscribe({
        next:((response:any)=>{
          console.log("The order response :", response);
          let existingCartItem = this.cartItems.findIndex(items=> items.food_id.toString() === _foodId);
        console.log("The existing  cart are:", existingCartItem);
        // /**add /update food items in the cart */
        if(existingCartItem !== -1){
            this.cartItems[existingCartItem].quantity += this.quantity;
        }
          const cartItem = {
            food: f.food,
            quantity: this.quantity,
            price: f.price
          };
          console.log("The food cart items:", cartItem);
          this.cartItems.unshift(cartItem);
          // Update the frontend stock quantity
          f.stock -= this.quantity;
          // Reset the quantity to default value (1) for next add to cart action
          // this.quantity = 1;
          console.log("The cart items after adding to the cart :", this.cartItems);
          this.errorMessage = '';
        }),
        error:((error:any)=>{
          console.log("Error during the add to cart", error);
          this.errorMessage = error.error.message;
          alert(this.errorMessage);
        }),
        complete:(()=>{
          console.log("The order api add to cart is fetched successfully..")
        })
      })
    }
    /**load the cart items after login */
    loadCartOnLogin(){
      if(this.userId){
        console.log("The user for the cart :", this.userId);
        this.oService.fetchCartByUserId(this.userId).subscribe({
          next:((response:any)=>{
              console.log('Fetched cart items :', response);
              this.cart_id = response.cart._id;
              console.log("This cart ID : ", this.cart_id);
              this.cartItems = response.cart.items.map((item:any)=>({
                ...item,
                food: item.food_id.food,
                price: item.food_id.price
              }));
              console.log("This cart ID : ", this.cart_id);
          })
        })
        
      }else{
        console.log('The users ID is not set..');
      }
    }
    /**generate the bill */
    generateBill(){
      console.log('The bill is generated..');
      console.log("Before proceeding to the Proceed to the bill-info", this.cart_id);
      if(this.cart_id){
        console.log("Proceed to the bill-info", this.cart_id);
        this.oService.generateBillInfo(this.cart_id).subscribe({
          next:((response:any)=>{
              console.log("The bill-info :", response);
              alert(response['message'])
              alert(response['info'])
          }),
          complete:(()=>{
            console.log("The bill info api is call");
          }),
          error:((error:any)=>{
              console.log("Error!! Please Wait for the bill-info", error);
          })
        })
      }
    }
    /**get user data from the local storage */
    getUsersDataFromLocal(){
      console.log(localStorage.getItem("userInfo"));
      this.userInfo = JSON.parse(localStorage.getItem("userInfo") || '[]');
      console.log("This user infos in the local storage : ", this.userInfo);
    }
    logout(){
      console.log("the logout button is hit");
      /**the logout api call here */
      this.userService.logoutUser()?.subscribe({
        next:(()=>{
            alert(`${this.userInfo.activeUser} logout successfully`);
            localStorage.clear();
            // localStorage.removeItem('cartItemss');
            this.route.navigateByUrl('/login');
        }),
        complete:(()=>{
            console.log("the users logout api call..");
        }),
        error:((error:any)=>{
            console.log("Error during the logout ..", error);
        })
      })
    }
}