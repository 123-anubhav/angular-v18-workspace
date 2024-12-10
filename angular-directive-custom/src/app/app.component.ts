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
