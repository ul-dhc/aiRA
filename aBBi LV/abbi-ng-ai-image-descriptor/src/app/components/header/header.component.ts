import { Component, Input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  imports: [
    MatIconModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() showLanguageButton = true;

  showInfoOverlay = signal(false);
  openInfoSection = signal<string | null>('about');

  openInfoOverlay(event: Event) {
    event.preventDefault();
    this.showInfoOverlay.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeInfoOverlay() {
    this.showInfoOverlay.set(false);
    document.body.style.overflow = '';
  }

  toggleInfoSection(section: string) {
    this.openInfoSection.update(current =>
      current === section ? null : section
    );
  }
}
