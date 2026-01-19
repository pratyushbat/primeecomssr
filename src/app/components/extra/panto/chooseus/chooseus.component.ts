import { Component } from '@angular/core';
import { ContainerComponent } from '../../layout/container/container.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chooseus',
  standalone: true,
  templateUrl: './chooseus.component.html',
  imports: [CommonModule, ContainerComponent],
  styleUrl: './chooseus.component.scss'
})
export class ChooseusComponent {

  trackByTitle(index: number, item: any) {
    return item.title;
  }
  chooseUsBoxes = [
    {
      title: 'Luxury facilities',
      description:
        'The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities.',
      linkTo: '',
    },

    {
      title: 'Affordable Price',
      description:
        'You can get a workspace of the highst quality at an affordable price and still enjoy the facilities that are oly here.',
      linkTo: '',
    },

    {
      title: 'Many Choices',
      description:
        'We provide many unique work space choices so that you can choose the workspace to your liking.',
      linkTo: '',
    },
  ];
}
