import { CommonModule } from '@angular/common';
import { Component, Input, input } from '@angular/core';


@Component({
  selector: 'app-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './container.component.html',
  styleUrl: './container.component.scss'
})
export class ContainerComponent {

  @Input() public className = '';
  /*   className = input<string>(''); */
}
