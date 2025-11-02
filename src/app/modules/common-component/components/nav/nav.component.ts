import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isMenuVisible:boolean = false;


  /**
   * Toggle MenuOverlay
   */
  displayMenuOverlay() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  /**
   *
   * @param event
   */
    @HostListener('window:resize', ['$event'])
    onResize(event: Event) {
      this.checkWidth();
    }

    /**
     *
     */
    checkWidth() {
      if (window.innerWidth > 768 && this.isMenuVisible) {
        this.isMenuVisible = false;
      }
    }

}
