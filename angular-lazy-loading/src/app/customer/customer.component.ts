import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit{

  ngOnInit() {
    console.log('CustomerComponent initialized');
  }
  
}
