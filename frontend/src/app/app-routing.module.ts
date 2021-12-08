import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './dashboard/home-page/home-page.component';
import { RedirectPageComponent } from './dashboard/redirect/redirect-page.component';
import { LoginPageComponent } from './login/login-page/login-page.component';

const routes: Routes = [
  { path: 'home/:id', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent},
  { path: 'redirect/:id', component: RedirectPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
