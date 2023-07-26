import {Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog', templateUrl: './dialog.component.html', styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() isOpen = false;
  @ViewChild('open', {static: false}) openButton!: ElementRef;
  @ViewChild('close', {static: false}) closeButton!: ElementRef;

  toggleDialog() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.closeButton.nativeElement.focus();
      this.captureFocus();
    } else this.openButton.nativeElement.focus();
  }

  action(e: KeyboardEvent) {
    if (e.keyCode === 27 || e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  private captureFocus() {
    const focusableElements = document.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
    const firstFocusableElement = this.openButton.nativeElement as HTMLElement;
    const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    const KEYCODE_TAB = 9;

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;

      if (!isTabPressed) {
        return;
      }

      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    });
  }
}
