import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './guard/auth.guard';
import { userauthGuard } from './guard/userguard/userauth.guard';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'food',
    loadChildren: () =>
      import('./pages/food/food.module').then((m) => m.FoodModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule), canActivate:[authGuard]
  },
  { path: 'user', loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule), canActivate:[userauthGuard] },
  {
    path: '**',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
