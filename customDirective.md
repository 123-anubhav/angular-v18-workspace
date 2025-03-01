# Angular Directives - Predefined and Custom

## 1. Overview
Directives in Angular are used to manipulate the DOM by changing its structure or behavior. Angular provides **predefined directives** like `ngIf`, `ngFor`, and `ngClass`, and also allows developers to create **custom directives**.

This document covers **custom directives**, their usage, flow, and implementation with practical examples.

---

## 2. Flow of Custom Directive Execution
1. **Angular Bootstraps the App** - The `AppComponent` is loaded first.
2. **Component Loads the Template** - The HTML file linked to the component is rendered.
3. **Directive is Applied to Elements** - Angular detects elements with the directive selector (`appCustomdirective`).
4. **Directive Constructor Executes** - The directive class is instantiated.
5. **ngOnInit() Executes** - Initial setup logic is applied to the element.
6. **Event Listeners Trigger Changes** - `@HostListener` listens to events and updates styles dynamically.

---

## 3. Creating a Custom Directive
To create a custom directive in Angular, use the following command:

```sh
ng generate directive customdirective
```
OR
```sh
ng g d customdirective
```
This will generate:
- `customdirective.directive.ts` (Directive class)
- Entry in `app.module.ts` (if using a module-based structure)

---

## 4. Custom Directive Example - `appCustomdirective`
This directive applies background color changes to elements when the mouse hovers over them.

### **Implementation:**

```typescript
import { Directive, ElementRef, HostBinding, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomdirective]',
  standalone: true
})
export class CustomdirectiveDirective implements OnInit {

  constructor(private elref: ElementRef, private render: Renderer2) { }

  private backgroundColor: string = "transparent";

  ngOnInit() {
    /* ElementRef Example */
    // this.elref.nativeElement.style.backgroundColor = 'teal';
    
    /* Renderer2 Example */
    // this.render.setStyle(this.elref.nativeElement, 'background-color', 'red');
  }

  // Using @HostBinding to dynamically bind background color
  @HostBinding('style.backgroundColor')
  private bgColor = "";

  @HostListener('mouseenter') mouseover(eventData: Event) {
      this.bgColor = 'cyan';
  }

  @HostListener('mouseleave') mouseLeave(eventData: Event) {
      this.bgColor = 'transparent';
  }
}
```

---

## 5. Usage in Component
To use this directive in a component, apply it to HTML elements:

### **Component Implementation**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DirectiveTestComponent } from './directive-test/directive-test.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DirectiveTestComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CustomDirective';
}
```

### **HTML Template Usage**
```html
<app-directive-test></app-directive-test>
<router-outlet></router-outlet>

<!-- Applying Custom Directive -->
<h2 style="color:red">Mouse over the content to see the custom directive implemented</h2>
<p appCustomdirective>Paragraph Example - ElementRef</p>
<span appCustomdirective>Span Tag Example - Renderer2</span>
```

---

## 6. Key Concepts Explained

### **1. ElementRef vs Renderer2**
- **ElementRef:** Directly accesses the DOM element.
- **Renderer2:** Angular's recommended way to manipulate DOM elements safely.

### **2. HostBinding & HostListener**
- **@HostBinding:** Binds properties to the host element.
- **@HostListener:** Listens to events on the host element (e.g., `mouseenter`, `mouseleave`).

---

## 7. Summary
- Custom directives allow modifying element properties dynamically.
- `ElementRef` gives direct access to elements but is not recommended.
- `Renderer2` is preferred for DOM manipulations.
- `@HostBinding` binds properties to elements dynamically.
- `@HostListener` listens to DOM events and executes logic accordingly.

This document provides a structured approach to understanding and implementing Angular directives efficiently. ??

