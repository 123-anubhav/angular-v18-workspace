import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { Customer } from '../../Model/customer';
import { RequestService } from '../../service/request.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  uname!: string;
  pwd!: string;
  phno!: string;
  roles: string[] = [];

  cObj: Customer = {
    uname: '',
    pwd: '',
    cid: 0,
    phno: '',
    roles: []
  };

  constructor(private service: RequestService, private router: Router) { }

  onSubmit() {
    this.cObj.uname = this.uname;
    this.cObj.pwd = this.pwd;
    this.cObj.phno = this.phno;

    this.cObj.roles = this.roles;
console.log(this.cObj.roles);

    let data = this.service.callRegister(this.cObj);
    data.subscribe(
      (response) => {
        alert('Registration successful!');
       //  this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        alert('Registration failed!');
        console.error(error);
      }
    );
  }
}
