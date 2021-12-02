import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import RegisterUser from '../RegisterUser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //properties
  registerUser: RegisterUser = new RegisterUser();
  warning: string = "";
  success: boolean = false;
  loading: boolean = false;

  //constr
  constructor(private auth: AuthService) {
   }

  //method
  onSubmit(f:NgForm) :void {
    console.log("in on subit")
    //ensure that registerUser.userName is not blank & registerUser.password equals registerUser.password2
    if (this.registerUser.userName != "" && this.registerUser.password === this.registerUser.password2) {
      this.loading = true;
      this.auth.register(this.registerUser).subscribe((success:any) => {
        this.success = true;
        this.warning = "";
        this.loading = false;
      }, (err:any) => {
        this.success = false;
        this.warning = err.error.message;
        this.loading = false;
      })
    }
  }


  ngOnInit(): void {
  }

}
