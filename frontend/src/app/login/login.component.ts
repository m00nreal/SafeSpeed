import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = {
    password : "",
    user: ""
  }

  constructor(private authService : AuthService,
      private router : Router) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.loginUser(this.usuario)
      .subscribe(
        res => {
          localStorage.setItem('token', res.token),
          this.router.navigate(['/home']);
        }
      ),
      err => console.log(err)
  }

}
