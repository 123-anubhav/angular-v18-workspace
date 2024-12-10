import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../Model/customer';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  baseUrl: string = "http://localhost:9090/api";

  constructor(private httpClient: HttpClient) { }

  callLogin(cData: Customer) {
    //  alert("from sevice ::"+cData.uname);
    let loginUrl: string = this.baseUrl + "/login";
    return this.httpClient.post<Customer>(loginUrl, cData, { responseType: 'text' as 'json' });
  }

  callRegister(cData: Customer) {
    alert("from sevice ::" + cData.uname);
    let registerUrl: string = this.baseUrl + "/register";
    return this.httpClient.post<Customer>(registerUrl, cData, { responseType: 'text' as 'json' });
  }

  afterLoginRedirectHomePage() {
    const token = sessionStorage.getItem('jwt_token'); // Retrieve token from session storage

    //alert(token)
    // Make sure token exists before proceeding
    if (!token) {
      console.error("Token not found");
      return;
    }

    // Define the URL for the request
    const loginUrl: string = `${this.baseUrl}/welcome`;

    // Set the headers with the Authorization token
    const headers = {
      Authorization: `Bearer ${token}`
    };    

    // Send GET request with the token in the Authorization header
    return this.httpClient.get(loginUrl, {
      responseType: 'text' as 'text',
      headers: headers // Attach headers with token
    });
  }
}
