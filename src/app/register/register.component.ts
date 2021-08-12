import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { RegisterUser } from '../RegisterUser';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public newUser : RegisterUser | any
  public warning: string | undefined
  public success: boolean = false; //default values
  public loading: boolean = false; //default values


  constructor(private auth:AuthService, private router:Router) { 
  }

  ngOnInit(): void {
    this.newUser = new RegisterUser()
    this.newUser.userName = ""
    this.newUser.password = ""
    this.newUser.password2 = ""
  }

  onSubmit(f: NgForm): void{
    console.log("Testing form: ")
    console.log(this.newUser.userName)
    console.log(this.newUser.password)
    console.log(this.newUser.password2)

    this.warning = "";


    if ((this.newUser.password == this.newUser.password2) && this.newUser.userName != "")
    {

      this.loading = true;

      this.auth.register(this.newUser).subscribe(
        (success) =>{
          this.success = true;
          this.warning = "";
          this.loading = false;
        },
        (err) => {
          this.success = false;
          this.warning = err.error.message;
          this.loading = false;
        }
      )
    }
    else if(this.newUser.userName == "")
    {
      console.log("No username")
      this.warning = "No username"
    }
    else if(this.newUser.password != this.newUser.password2)
    {
      console.log("Passwords do not match")
      this.warning = "Passwords do not match";
    }
    else
    {
      console.log("Passwords do not match and userName is empty")
      this.warning = "Passwords do not match and userName is empty" 
    }
  }
}
