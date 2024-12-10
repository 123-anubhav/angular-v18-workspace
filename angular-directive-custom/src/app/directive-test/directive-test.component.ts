import { Component } from '@angular/core';
import { CustomdirectiveDirective } from '../customdirective.directive';

@Component({
  selector: 'app-directive-test',
  standalone: true,
  imports: [CustomdirectiveDirective],
  templateUrl: './directive-test.component.html',
  styleUrl: './directive-test.component.css'
})
export class DirectiveTestComponent {

}
