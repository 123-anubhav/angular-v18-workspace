import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { json } from 'node:stream/consumers';
import { Customer } from '../../Model/customer';
import { RequestService } from '../../service/request.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  uname: string = "";
  pwd: string = "";

  cust: Customer = {
    uname: '',
    pwd: '',
    cid: 0,
    phno: '',
    roles: []
  };

  constructor(private http: HttpClient, private service: RequestService, private router: Router) { }


  onLogin() {
    //alert("btn clicked"+this.uname+":: "+this.pwd)
    this.cust.uname = this.uname;
    this.cust.pwd = this.pwd;
    let responseData = this.service.callLogin(this.cust);

    responseData.subscribe(res => {
      console.log(res);
      // this.storeToken(JSON.stringify(res));
      sessionStorage.setItem('jwt_token', JSON.stringify(res));

      // CHECK TOKEN EXPIRE TIME
      const decodedToken = JSON.parse(atob(JSON.stringify(res).split('.')[1]));
     // console.log(decodedToken.exp); // Check the expiration time
      const expirationTime = decodedToken.exp; // Example token expiration timestamp
      const date = new Date(expirationTime * 1000); // Convert seconds to milliseconds
      console.log(date.toString()); // Output: "Sun Nov 17 2024 11:06:53 GMT+0000 (UTC)"


      this.service.afterLoginRedirectHomePage()?.subscribe(r => {
        console.log("token value is ::" + r);
        if (r != null)
          alert("login success redirect r");
        this.router.navigate(['/login-home']);
      }, e => {
        console.log(e);
        this.router.navigate(['/error']);
      });
    }, err => {
      console.error('Login failed', err);
      alert('Invalid credentials');
    })
  }

  /* 
    // Save token to sessionStorage
    storeToken(token: string): void {
      sessionStorage.setItem('jwt_token', token);
    }
  
    // Get token from sessionStorage
    getToken(): string | null {
      return sessionStorage.getItem('jwt_token');
    }
  
    // Remove token from sessionStorage
    clearToken(): void {
      sessionStorage.removeItem('jwt_token');
    }
  
    // Check if token exists
    isAuthenticated(): boolean {
      return this.getToken() !== null;
    }
  
    // Add token to request headers
    getAuthHeaders(): HttpHeaders {
      const token = this.getToken();
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`,
      });
    }
  
    getHeaders(): HttpHeaders {
      const token = sessionStorage.getItem('jwt_token');
      return new HttpHeaders({
        Authorization: `Bearer ${token}` // Attach token to Authorization header
      });
    }
  
    getProtectedData() {
      const headers = this.getHeaders();
      return this.http.get('/protected-endpoint', { headers });
    }
   */
}
