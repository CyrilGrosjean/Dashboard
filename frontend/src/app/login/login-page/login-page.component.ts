import { Component, OnInit } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { VKLoginProvider, FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { FormControl, FormGroup } from '@angular/forms';
import { PostRequestComponent } from "../post-request/post-request.component"
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  user!: SocialUser;
  loggedIn!: boolean;
  loginForm!: FormGroup;
  api = new PostRequestComponent(this.http);

  constructor(private authService: SocialAuthService, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
    this.loginForm = new FormGroup({
      login: new FormControl(''),
      password: new FormControl(''),
    });
  }

  setBody(x: SocialUser, authType: number): any {
    if (!x.email) {
      x.email = "AnoUser";
    }
    let body = {
      username: x.email,
      password: "",
      auth_type: authType,
      auth_id: parseInt(x.id),
    };
    return body;
  }

  loginFormSubmit(): void {
    console.log(this.loginForm.value.login);
    this.api.postLoginData({username: this.loginForm.value.login, password: this.loginForm.value.password, auth_type: 4, auth_id: 1}, 'http://localhost:8080/login').subscribe((response) => {
      const obj = JSON.parse(JSON.stringify(response));
      console.log("response: " + obj.error);
      if (obj.error === "Account is not registered.") {
        this.api.postLoginData({username: this.loginForm.value.login, password: this.loginForm.value.password, auth_type: 4, auth_id: 1}, 'http://localhost:8080/register').subscribe((response) => {
          const obj = JSON.parse(JSON.stringify(response));
          console.log("response register: " + obj.error);
          if (obj.error === undefined) {
            this.router.navigate(['/home/' + obj.id]);
          }
        });
      } else {
        this.router.navigate(['/home/' + obj.id]);
      }
    });
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(x => {
      this.api.postLoginData(this.setBody(x, 1), 'http://localhost:8080/login').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log("response: " + obj.error);
        console.log(response);
        if (obj.error === "Account is not registered.") {
          this.api.postLoginData(this.setBody(x, 1), 'http://localhost:8080/register').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            console.log("response register: " + obj.error);
            if (obj.error === undefined) {
              this.router.navigate(['/home/' + obj.id]);
            }
          });
        } else {
          this.router.navigate(['/home/' + obj.id]);
        }
      });
    });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(x => {
      this.api.postLoginData(this.setBody(x, 2), 'http://localhost:8080/login').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log("response: " + obj.error);
        if (obj.error === "Account is not registered.") {
          this.api.postLoginData(this.setBody(x, 2), 'http://localhost:8080/register').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            console.log("response register: " + obj.error);
            if (obj.error === undefined) {
              this.router.navigate(['/home/' + obj.id]);
            }
          });
        } else {
          this.router.navigate(['/home/' + obj.id]);
        }
      });
    });
  }

  signInWithVK(): void {
    this.authService.signIn(VKLoginProvider.PROVIDER_ID).then(x => {
      this.api.postLoginData(this.setBody(x, 3), 'http://localhost:8080/login').subscribe((response) => {
        const obj = JSON.parse(JSON.stringify(response));
        console.log("response: " + obj.error);
        if (obj.error === "Account is not registered.") {
          this.api.postLoginData(this.setBody(x, 3), 'http://localhost:8080/register').subscribe((response) => {
            const obj = JSON.parse(JSON.stringify(response));
            console.log("response register: " + obj.error);
            if (obj.error === undefined) {
              this.router.navigate(['/home/' + obj.id]);
            }
          });
        } else {
          this.router.navigate(['/home/' + obj.id]);
        }
      });
    });
  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }


}
