import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mywidget',
  templateUrl: './mywidget.component.html',
  styleUrl: './mywidget.component.scss'
})
export class MywidgetComponent {
  @Input() message = '';
}
