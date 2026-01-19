import { Component, inject } from '@angular/core';
import { ContainerComponent } from '../../layout/container/container.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  imports: [CommonModule, ContainerComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
  standalone: true,
})
export class HeroComponent {
  private router = inject(Router);

  handleSubmit(e: Event, userQuery: string) {
    e.preventDefault();
    this.onSearchChange(userQuery);
  }

  onSearchChange(query: string) {
    if (!query.trim()) return;

    this.router.navigate(['/search'], {
      queryParams: { query },
    });
  }
}
