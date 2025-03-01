# **Angular Filters, TrackBy, @Input, and @Output - Detailed Explanation**

## **1. Introduction**

Angular provides efficient ways to handle data rendering and communication between components. This document explains:

- **Angular Pipes (Filters)** for transforming displayed data
- **TrackBy** for performance optimization with `*ngFor`
- **@Input & @Output** decorators for parent-child component communication

---

## **2. Angular Pipes (Filters)**

### **What are Pipes?**

Pipes transform data before displaying it in the UI. They are useful for filtering, formatting, or modifying displayed values.

### **Example: Custom Expiry Date Pipe**

This pipe calculates the number of days remaining before a product expires.

#### **Implementation: **``

```typescript
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiryDaysCount',
  standalone: true
})
export class ExpiryDaysCountPipe implements PipeTransform {
  transform(expiryDate: Date): number {
    const today = new Date();
    const expiryDateProduct = new Date(expiryDate).getTime();
    const currentDate = today.getTime();
    const differenceInTime = expiryDateProduct - currentDate;

    return Math.ceil(differenceInTime / (1000 * 3600 * 24));
  }
}
```

#### **Usage in **``

```html
<td>{{prod.expiryDate | expiryDaysCount}}</td>
```

---

## **3. TrackBy for Optimized **``

### **Why Use TrackBy?**

By default, Angular re-renders an entire list when an item is added or removed. `trackBy` helps Angular uniquely identify each list item, improving performance.

### **Implementation in **``

```typescript
trackByProductId(index: number, product: IProduct): string {
  return product.productName;
}
```

#### **Usage in **``

```html
<ng-container *ngFor="let prod of product; let i = index; trackBy: trackByProductId">
```

---

## **4. @Input and @Output for Parent-Child Communication**

### **A. @Input (Receiving Data from Parent)**

**Example: **``** receives category count values from **``**.**

```typescript
@Input() electric: number = 0;
@Input() electronic: number = 0;
@Input() grocery: number = 0;
```

**Usage in Parent (**``**):**

```html
<app-product-count [electronic]="electronicItemTotal"
                   [electric]="electricCount"
                   [grocery]="groceryCount"
                   (radioBtnValue)="onCategorySelected($event)" />
```

---

### **B. @Output (Sending Data to Parent)**

**Example: **``** sends the selected category to the parent.**

```typescript
@Output() radioBtnValue: EventEmitter<string> = new EventEmitter<string>();

onRadioButtonChange(value: string) {
  this.radioBtnValue.emit(value);
}
```

**Usage in HTML:**

```html
<input type="radio" name="radioBtnValue" value="Electric" (change)="onRadioButtonChange('Electric')" />
```

---

## **5. Complete Component Code**

### **A. **``

```typescript
import { Component } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ExpiryDaysCountPipe } from '../pipes/expiry-days-count.pipe';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ExpiryDaysCountPipe],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
  selectedCategory: string = '';

  product: IProduct[] = [
    { productName: 'Laptop', qty: 10, actualPrice: 50000, discount: 10, price: 45000, expiryDate: new Date(), category: 'Electronic', rating: 4.5 },
    { productName: 'Mobile', qty: 5, actualPrice: 30000, discount: 5, price: 28500, expiryDate: new Date(), category: 'Electronic', rating: 4.2 },
    { productName: 'Blender', qty: 8, actualPrice: 5000, discount: 15, price: 4250, expiryDate: new Date(), category: 'Electric', rating: 4.0 }
  ];

  electronicItemTotal = this.product.filter(p => p.category === 'Electronic').length;
  electricCount = this.product.filter(p => p.category === 'Electric').length;
  groceryCount = this.product.filter(p => p.category === 'Grocery').length;

  onCategorySelected(category: string) {
    this.selectedCategory = category;
  }

  trackByProductId(index: number, product: IProduct): string {
    return product.productName;
  }
}
```

---

### **B. **``

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-count',
  standalone: true,
  templateUrl: './product-count.component.html',
  styleUrl: './product-count.component.css'
})
export class ProductCountComponent {
  @Input() electric: number = 0;
  @Input() electronic: number = 0;
  @Input() grocery: number = 0;
  @Output() radioBtnValue: EventEmitter<string> = new EventEmitter<string>();

  onRadioButtonChange(value: string) {
    this.radioBtnValue.emit(value);
  }
}
```

---

## **6. How the Application Works**

1. **Parent Component (**``**)** passes category counts to the **Child Component (**``**)** using `@Input`.
2. **Child Component (**``**)** emits the selected category using `@Output`.
3. **Parent Component (**``**)** listens to this event and updates `selectedCategory`.
4. **Product List is filtered** dynamically based on the selected category.
5. **TrackBy optimizes performance** by reducing unnecessary re-renders.
6. **Expiry Date Pipe** calculates the remaining days before expiry.

---

## **7. Summary**

| Concept           | Description                                                                                      |
| ----------------- | ------------------------------------------------------------------------------------------------ |
| **Pipe (**``**)** | Transforms product expiry date to show remaining days.                                           |
| **TrackBy**       | Optimizes `*ngFor` performance by tracking list items efficiently.                               |
| **@Input**        | Passes category count from parent (`ProductListComponent`) to child (`ProductCountComponent`).   |
| **@Output**       | Emits selected category from child (`ProductCountComponent`) to parent (`ProductListComponent`). |

---

## **8. Conclusion**

- **TrackBy** improves performance.
- **@Input/@Output** enables component communication.
- **Pipes** allow transforming data dynamically.

########################################################################################################################

Here are some **enhancements and additional explanations** to further improve the functionality and efficiency of your Angular app.

---

## **1. Enhancing the Filtering Mechanism**
Currently, the filtering logic is inside the component. A better approach is to use a **custom pipe** to handle filtering dynamically.

### **Create a Filter Pipe for Product Category**
```sh
ng generate pipe product-category-filter --standalone
```

#### **`product-category-filter.pipe.ts`**
```typescript
import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/product.model';

@Pipe({
  name: 'categoryFilter',
  standalone: true
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(products: IProduct[], selectedCategory: string): IProduct[] {
    if (!selectedCategory || selectedCategory === 'All') {
      return products;
    }
    return products.filter(product => product.category === selectedCategory);
  }
}
```
#### **Usage in `product-list.component.html`**
```html
<ng-container *ngFor="let prod of product | categoryFilter:selectedCategory; trackBy: trackByProductId">
```
**? Benefit:** This approach keeps filtering logic separate, making the component cleaner.

---

## **2. UI Enhancements**
Make the category selection more user-friendly by using **radio buttons** in `product-count.component.html`:

```html
<label>
  <input type="radio" name="category" value="All" (change)="onRadioButtonChange('All')" checked />
  All
</label>

<label>
  <input type="radio" name="category" value="Electronic" (change)="onRadioButtonChange('Electronic')" />
  Electronic ({{ electronic }})
</label>

<label>
  <input type="radio" name="category" value="Electric" (change)="onRadioButtonChange('Electric')" />
  Electric ({{ electric }})
</label>

<label>
  <input type="radio" name="category" value="Grocery" (change)="onRadioButtonChange('Grocery')" />
  Grocery ({{ grocery }})
</label>
```
**? Benefit:** Users can filter products **instantly** using a simple radio button selection.

---

## **3. Display Expiry Date in a More Readable Format**
Instead of just displaying days remaining, let’s **highlight products that are about to expire**.

### **Update `expiryDaysCount.pipe.ts`**
```typescript
transform(expiryDate: Date): string {
  const today = new Date();
  const expiryDateProduct = new Date(expiryDate);
  const differenceInTime = expiryDateProduct.getTime() - today.getTime();
  const daysLeft = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  if (daysLeft <= 0) {
    return 'Expired';
  } else if (daysLeft <= 3) {
    return `?? Expiring Soon (${daysLeft} days left)`;
  } else {
    return `${daysLeft} days left`;
  }
}
```
**? Benefit:** Users can see urgent products that require attention.

---

## **4. Use Angular Material for Better UI**
Install Angular Material:
```sh
ng add @angular/material
```
### **Enhance Product Table**
Modify `product-list.component.html`:
```html
<table mat-table [dataSource]="product | categoryFilter:selectedCategory" class="mat-elevation-z8">
  <tr>
    <th mat-header-cell *matHeaderCellDef> Product Name </th>
    <th mat-header-cell *matHeaderCellDef> Category </th>
    <th mat-header-cell *matHeaderCellDef> Price </th>
    <th mat-header-cell *matHeaderCellDef> Expiry </th>
  </tr>

  <tr mat-row *matRowDef="let prod; columns: ['productName', 'category', 'price', 'expiryDate']">
    <td mat-cell *matCellDef="let prod">{{ prod.productName }}</td>
    <td mat-cell *matCellDef="let prod">{{ prod.category }}</td>
    <td mat-cell *matCellDef="let prod">{{ prod.price | currency }}</td>
    <td mat-cell *matCellDef="let prod">{{ prod.expiryDate | expiryDaysCount }}</td>
  </tr>
</table>
```
**? Benefit:** Angular Material provides **aesthetic** UI elements with built-in styling.

---

## **5. Improve Performance with Change Detection**
Right now, the entire product list re-renders whenever a user changes the category. We can optimize it using **OnPush change detection strategy**.

### **Modify `product-list.component.ts`**
```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {
  // Component logic
}
```
**? Benefit:** This prevents unnecessary DOM updates, making the app **faster**.

---

## **6. Summary of Enhancements**
| Feature | Benefit |
|---------|---------|
| **Custom Pipe for Filtering** | Cleaner component logic, reusable code |
| **Radio Button UI for Category Selection** | More user-friendly filtering |
| **Improved Expiry Pipe** | Highlights urgent products |
| **Angular Material Table** | Better UI and readability |
| **Change Detection Optimization** | Improves app performance |

---

## **7. What’s Next?**
Would you like:
1. **State Management** (e.g., NgRx) for better data handling?
2. **Unit Tests** using Jasmine & Karma?
3. **Backend Integration** with Node.js/Spring Boot?

#########################

Great! Let's break it down into **three key areas** to enhance your project further:  

1. **State Management with NgRx** for better data handling  
2. **Unit Testing with Jasmine & Karma** for reliability  
3. **Backend Integration** (Node.js or Spring Boot)  

---

# **1?? Implementing State Management with NgRx**
Instead of managing state manually in components, **NgRx** helps store, retrieve, and modify data globally in a structured way.

## **Step 1: Install NgRx Packages**
Run the following command to install NgRx dependencies:
```sh
ng add @ngrx/store @ngrx/effects @ngrx/entity @ngrx/store-devtools
```

## **Step 2: Define Product State Model**
Create a file: `src/app/store/models/product.model.ts`
```typescript
export interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  expiryDate: Date;
}
```

## **Step 3: Create Actions for Product Management**
Create a new folder: `src/app/store/actions/`  
Create a file: `product.actions.ts`
```typescript
import { createAction, props } from '@ngrx/store';
import { Product } from '../models/product.model';

export const loadProducts = createAction('[Product] Load Products');
export const loadProductsSuccess = createAction('[Product] Load Products Success', props<{ products: Product[] }>());
export const loadProductsFailure = createAction('[Product] Load Products Failure', props<{ error: string }>());
```

## **Step 4: Create a Reducer for Products**
Create a new folder: `src/app/store/reducers/`  
Create a file: `product.reducer.ts`
```typescript
import { createReducer, on } from '@ngrx/store';
import { Product } from '../models/product.model';
import * as ProductActions from '../actions/product.actions';

export interface ProductState {
  products: Product[];
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  error: null
};

export const productReducer = createReducer(
  initialState,
  on(ProductActions.loadProductsSuccess, (state, { products }) => ({
    ...state,
    products
  })),
  on(ProductActions.loadProductsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
```

## **Step 5: Register Store in App Module**
Modify `app.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './store/reducers/product.reducer';

@NgModule({
  imports: [
    StoreModule.forRoot({ product: productReducer }) // Register store
  ]
})
export class AppModule {}
```

## **Step 6: Dispatch Actions in Product List Component**
Modify `product-list.component.ts`:
```typescript
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../store/models/product.model';
import { loadProducts } from '../store/actions/product.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private store: Store<{ product: { products: Product[] } }>) {}

  ngOnInit() {
    this.store.dispatch(loadProducts()); // Load products
    this.products$ = this.store.select(state => state.product.products);
  }
}
```

? **Benefit:**  
- Centralized state management  
- Easy debugging using Redux DevTools  
- Better performance with immutable state updates  

---

# **2?? Unit Testing with Jasmine & Karma**
Unit tests ensure that your application behaves correctly.

### **Step 1: Write a Simple Test for Product List Component**
Modify `product-list.component.spec.ts`:
```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from '../store/reducers/product.reducer';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      imports: [StoreModule.forRoot({ product: productReducer })]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### **Step 2: Run Tests**
Execute:
```sh
ng test
```
**Expected Output:** ? Tests should pass!

? **Benefit:**  
- Ensures **reliability** of app logic  
- Prevents **bugs** from reaching production  
- Helps with **future modifications**  

---

# **3?? Backend Integration (Node.js or Spring Boot)**
Your Angular app needs a **backend API** to fetch product data.

### **Option 1: Spring Boot Backend**
If you are using Spring Boot, create a simple REST API:

#### **`ProductController.java`**
```java
@RestController
@RequestMapping("/api/products")
public class ProductController {

    @GetMapping
    public List<Product> getProducts() {
        return List.of(
            new Product(1, "Laptop", "Electronic", 1000.0, LocalDate.now().plusDays(30)),
            new Product(2, "Phone", "Electronic", 500.0, LocalDate.now().plusDays(15))
        );
    }
}
```

### **Option 2: Node.js (Express) Backend**
Install Express:
```sh
npm install express cors
```
Create `server.js`:
```javascript
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/api/products', (req, res) => {
  res.json([
    { id: 1, productName: "Laptop", category: "Electronic", price: 1000, expiryDate: "2025-12-31" },
    { id: 2, productName: "Phone", category: "Electronic", price: 500, expiryDate: "2025-10-10" }
  ]);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

### **Connecting Angular to Backend**
Modify `product.service.ts`:
```typescript
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../store/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
```

### **Dispatch API Data to Store**
Modify `product.effects.ts`:
```typescript
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductService } from '../../services/product.service';
import { loadProducts, loadProductsSuccess, loadProductsFailure } from '../actions/product.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map(products => loadProductsSuccess({ products })),
          catchError(error => of(loadProductsFailure({ error: error.message })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private productService: ProductService) {}
}
```

? **Benefit:**  
- Fetch real-time data  
- Manage backend logic separately  
- Secure API calls  

---

## **Final Thoughts**
Would you like additional features?  
1?? **Pagination & Sorting**  
2?? **Authentication (JWT-based Login System)**  
3?? **Deployment Strategies** (Firebase, AWS, or DigitalOcean)  
