import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import User from '../User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //properties
  user: User = new User();
  warning: string = "";
  loading: boolean = false;

  //constr
  constructor(private auth: AuthService,
    private router: Router) { }

  //method
  onSubmit(f: NgForm): void {
    if (this.user.userName != "" && this.user.password != "") {
      this.loading = true;
      this.auth.login(this.user).subscribe((success: any) => {
        this.loading = false;
        localStorage.setItem("access_token",success.token);
        this.router.navigate(['/newReleases']);
      }, (err: any) => {
        this.warning = err.error.message;
        this.loading = false;
      })
    }
  }

  ngOnInit(): void {
  }

}
