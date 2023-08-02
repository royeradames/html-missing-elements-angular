import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-dialog', templateUrl: './dialog.component.html', styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, AfterViewChecked {
  firstFocusableElement!: HTMLElement
  lastFocusableElement!: HTMLElement
  @Input() isOpen = true;
  @ViewChild('closeButton', {static: false}) closeButton!: ElementRef;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() openEvent = new EventEmitter<void>();

  get focusableElements(): NodeListOf<HTMLElement> {
    return document.querySelectorAll('a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select') as NodeListOf<HTMLElement>;
  }

  get isFirstFocusableElementFocused(): boolean {
    return document.activeElement === this.closeButton.nativeElement;
  }

  get isLastFocusableElementFocused(): boolean {
    return document.activeElement === this.lastFocusableElement;
  }

  ngAfterViewInit(): void {
    this.captureFocus();
  }

  ngAfterViewChecked(): void {
    if (!this.isOpen) return;
    this.closeButton.nativeElement.focus();
    this.captureFocus();
    this.openEvent.emit()
  }

  close() {
    this.isOpen = false;
    this.closeEvent.emit();
  }

  closeByKeyboard(e: KeyboardEvent) {
    const isEscPressed = e.key === 'Escape' || e.keyCode === 27;
    if (!isEscPressed) return;
    this.close();
  }

  getLastFocusableElement(): HTMLElement {
    const focusableElements = this.focusableElements
    return focusableElements[focusableElements.length - 1];
  }

  captureFocus() {
    this.firstFocusableElement = this.closeButton.nativeElement;
    this.lastFocusableElement = this.getLastFocusableElement();
    document.addEventListener('keydown', this.captureTabbing);
  }

  isTabPressed(e: KeyboardEvent): boolean {
    const KEYCODE_TAB = 9;
    return e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
  }

  captureTabbing(e: KeyboardEvent) {
    if (!this.isTabPressed) return;
    if (e.shiftKey && this.isFirstFocusableElementFocused) {
      e.preventDefault();
      this.lastFocusableElement.focus();
      return;
    }
    if (!this.isLastFocusableElementFocused) return;
    e.preventDefault();
    this.firstFocusableElement.focus();
  }
}
