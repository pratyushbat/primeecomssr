import { Component } from '@angular/core';


@Component({
  selector: 'app-pfooter',
  templateUrl: './pfooter.component.html',
  styleUrl: './pfooter.component.scss'
})
export class PfooterComponent {
  footerLinks = [
    {
      title: 'Services',
      links: [
        { title: 'Email', link: '' },
        { title: 'Campaigns', link: '' },
        { title: 'Branding', link: '' },
      ],
    },

    {
      title: 'Furniture',
      links: [
        { title: 'Sofas', link: '/categories/sofa' },
        { title: 'Chairs', link: '/categories/chair' },
        { title: 'See All', link: '/shop' },
      ],
    },

    {
      title: 'Follow Us',
      links: [
        { title: 'Facebook', link: 'https://facebook.com' },
        { title: 'Twitter', link: 'https://x.com/' },
        { title: 'Instagram', link: 'https://instagram.com' },
      ],
    },
  ];

  currentYear = new Date().getFullYear();


}
