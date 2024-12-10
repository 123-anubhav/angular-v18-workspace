import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  ngOnInit() {
    console.log('ProductComponent initialized');
  }
  
}
