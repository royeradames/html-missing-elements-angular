import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog', templateUrl: './dialog.component.html', styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit {

  @Input() isOpen = true;
  @ViewChild('closeButton', {static: false}) closeButton!: ElementRef;
  @Output() closeEvent = new EventEmitter<void>();
  ngAfterViewInit(): void {
    if(this.isOpen) {
      this.closeButton.nativeElement.focus();
      this.captureFocus();
    }
  }
  close() {
    this.isOpen = false;
    this.closeEvent.emit();
  }

  action(e: KeyboardEvent) {
    if (e.keyCode === 27 || e.key === 'Escape') {
      this.isOpen = false;
    }
  }

  private captureFocus() {
    // const focusableElements = document.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select');
    // const firstFocusableElement = this.openButton.nativeElement as HTMLElement;
    // const lastFocusableElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    // const KEYCODE_TAB = 9;
    //
    // document.addEventListener('keydown', (e: KeyboardEvent) => {
    //   const isTabPressed = e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
    //
    //   if (!isTabPressed) {
    //     return;
    //   }
    //
    //   if (e.shiftKey) {
    //     if (document.activeElement === firstFocusableElement) {
    //       lastFocusableElement.focus();
    //       e.preventDefault();
    //     }
    //   } else {
    //     if (document.activeElement === lastFocusableElement) {
    //       firstFocusableElement.focus();
    //       e.preventDefault();
    //     }
    //   }
    // });
  }
}
