# Angular Routing - Scenario-Based Explanation

## Introduction
This document explains various routing concepts in Angular through practical scenarios. The implementation demonstrates handling dynamic parameters, query parameters, subscriptions, and navigation between components.

---

## Bootstrap Application
### **`main.ts`**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```
- This bootstraps the Angular application with `AppComponent`.
- If there is any error during bootstrapping, it gets logged in the console.

---

## Scenario: Dynamic Routing and Subscription

### **Component: Customer**
#### **`customer.component.ts`**
```typescript
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit, OnDestroy {
  user: any = {
    id: 0,
    name: ''
  };
  paramSubscription!: Subscription;

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    console.log("ngOnInit executed when component loads");
    this.user.id = this.actRoute.snapshot.params['id'];
    this.user.name = this.actRoute.snapshot.params['name'];

    // Subscribing to route parameters to handle dynamic changes
    this.paramSubscription = this.actRoute.params.subscribe(
      (params: Params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );
  }

  ngOnDestroy() {
    console.log("ngOnDestroy executed when component unloads");
    if (this.paramSubscription) {
      this.paramSubscription.unsubscribe();
      console.log('Unsubscribed from route parameters');
    }
  }
}
```

### **Key Takeaways:**
- **Why Subscribe?** When clicking on dynamic links, the URL updates, but the component does not reflect changes until you subscribe to `params`.
- **Unsubscribe to Prevent Memory Leaks**: If the subscription remains active, it may affect performance. Hence, `ngOnDestroy()` is used to unsubscribe.

#### **`customer.component.html`**
```html
<div class="container">
    User ID: {{user.id}}
    <br />
    User Name: {{user.name}}
    <hr />
    <button>
        <h5><a [routerLink]="['/customers',50,'Raghu']">Load Raghu</a></h5>
    </button>
    <br/><br/>
    <button>
        <h5><a [routerLink]="['/customers',60,'Sandhya']">Load Sandhya</a></h5>
    </button>
</div>
```
---

## Scenario: Query Parameters Handling

### **Component: EditProduct**
#### **`edit-product.component.ts`**
```typescript
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  allowEdit: boolean = false;
  product: any = {
    id: 0,
    name: ''
  };

  constructor(private actRoute: ActivatedRoute) {}

  ngOnInit() {
    this.product.id = this.actRoute.snapshot.params['id'];
    this.product.name = this.actRoute.snapshot.params['name'];
    
    this.actRoute.queryParams.subscribe((param: Params) => {
      this.allowEdit = param['allowEdit'] === '1';
    });
  }
}
```

#### **`edit-product.component.html`**
```html
<ng-container *ngIf="allowEdit">
    <div class="container">
        Product ID: {{product.id}}
        <br />
        Product Name: {{product.name}}
        <hr />
    </div>
</ng-container>

<ng-container *ngIf="!allowEdit">
    <div class="container">
        You are not allowed to edit this product.
        <hr />
        <p class="text-danger">Check your URL, '?allowEdit=0'</p>
    </div>
</ng-container>
```

### **Key Takeaways:**
- **Query Parameters vs Route Parameters**: Query parameters (`?allowEdit=1`) are read using `queryParams`, while path parameters (`/edit-product/:id/:name`) use `params`.
- **Real-world Use Case**: Permissions-based UI changes, e.g., Admin vs Normal User.

---

## Scenario: Absolute vs Relative Navigation

### **Component: Home**
#### **`home.component.ts`**
```typescript
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router: Router) {}

  loadProducts() {
    this.router.navigate(["/products"]);
  }

  loadCustomers() {
    this.router.navigate(["/customers"]);
  }
}
```

#### **`home.component.html`**
```html
<div class="container">
    <h2 class="text-center">This is the Home Component</h2>
    <hr />
    <button>
        <a (click)="loadProducts()">Load Products</a>
    </button>
    <br /><br />
    <button>
        <a (click)="loadCustomers()">Load Customers</a>
    </button>
</div>
```

### **Key Takeaways:**
- **Absolute Path Navigation (`/products`)**: Directly navigates to a new route.
- **Relative Path Navigation**: Uses `ActivatedRoute` to navigate relative to the current URL.
- **Real-world Use Case**: E-commerce product listings where users navigate from categories to products dynamically.

---

## Conclusion
This document covered Angular routing concepts with:
- **Dynamic Parameters (`:id/:name`)**
- **Query Parameters (`?allowEdit=1`)**
- **Subscriptions and Unsubscriptions**
- **Navigation (Absolute vs Relative)**
- **Real-world Use Cases**

This will help in understanding how to manage routing dynamically and optimize Angular applications effectively.

# Angular Routing Guide

## 1. Introduction to Angular Routing
Angular routing allows navigation between different views or components within a Single Page Application (SPA). It enables developers to create seamless user experiences without requiring full-page reloads.

## 2. Setting Up Routing in Angular
### Step 1: Create an Angular Project
```bash
ng new my-angular-app
cd my-angular-app
```

### Step 2: Generate Components
```bash
ng generate component home
ng generate component about
ng generate component contact
```

### Step 3: Configure Routing Module
Modify `app-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' } // Wildcard route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### Step 4: Add Router Outlet in App Component
Modify `app.component.html`:
```html
<nav>
  <a routerLink="/">Home</a>
  <a routerLink="/about">About</a>
  <a routerLink="/contact">Contact</a>
</nav>
<router-outlet></router-outlet>
```

## 3. Angular CLI Commands for Routing
```bash
ng generate module app-routing --flat --module=app
ng generate component my-component --skip-tests
```

## 4. TypeScript Concepts Used in Angular Routing
- **Interfaces** (`Routes` interface for defining route configurations)
- **Modules** (`NgModule` for managing routing separately)
- **Decorators** (`@NgModule` and `@Component` annotations)
- **Class-based components** (Defining components as classes)

## 5. Interview Questions on Angular Routing

### Q1: What is Angular Routing?
**Answer:** Angular Routing enables navigation between different views within a Single Page Application (SPA) using URL-based navigation.

### Q2: How do you configure routes in Angular?
**Answer:**
- Define routes in `app-routing.module.ts` using the `Routes` array.
- Use `RouterModule.forRoot(routes)` for root-level routing.
- Add `<router-outlet></router-outlet>` in `app.component.html`.

### Q3: What is Lazy Loading in Angular Routing?
**Answer:** Lazy loading loads feature modules only when required. Example:
```typescript
const routes: Routes = [
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
];
```

### Q4: What is the Wildcard Route in Angular?
**Answer:** The wildcard route (`'**'`) is used to catch unknown routes and redirect users, typically to a 404 page.
```typescript
{ path: '**', redirectTo: 'home', pathMatch: 'full' }
```

### Q5: How can you pass parameters in Angular routes?
**Answer:**
- Define a route with parameters: `{ path: 'user/:id', component: UserComponent }`
- Access parameters in the component:
```typescript
import { ActivatedRoute } from '@angular/router';
constructor(private route: ActivatedRoute) {}
ngOnInit() {
  this.route.params.subscribe(params => console.log(params['id']));
}
```

## 6. Conclusion
Angular Routing is essential for building modern SPAs. Mastering it, along with TypeScript fundamentals, helps in developing scalable web applications. ??



