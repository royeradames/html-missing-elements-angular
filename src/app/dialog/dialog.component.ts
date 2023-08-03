import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-dialog', templateUrl: './dialog.component.html', styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, AfterContentChecked, OnDestroy {

  firstFocusableElement!: HTMLElement
  lastFocusableElement!: HTMLElement
  @Input() isOpen = true;
  @ViewChild('closeButton', {static: false}) closeButton!: ElementRef;
  @Output() closeEvent = new EventEmitter<void>();
  @Output() openEvent = new EventEmitter<void>();
  eventFunction = this.captureTabbing.bind(this)

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
    if (!this.isOpen) return;
    this.closeButton.nativeElement.focus();
    this.captureFocus();
    this.openEvent.emit()
  }

  ngAfterContentChecked(): void {
    if (!this.isOpen) return;
    this.lastFocusableElement = this.getLastFocusableElement();
  }

  close() {
    this.isOpen = false;
    this.closeEvent.emit();
  }

  closeOnEscape(e: KeyboardEvent) {
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
    document.addEventListener('keydown', this.eventFunction);
  }

  isTabPressed(e: KeyboardEvent): boolean {
    const KEYCODE_TAB = 9;
    return e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
  }

  captureTabbing(e: KeyboardEvent) {
    if (!this.isTabPressed(e)) return;
    if (e.shiftKey && this.isFirstFocusableElementFocused) {
      e.preventDefault();
      this.lastFocusableElement.focus();
      return;
    }
    if (!this.isLastFocusableElementFocused) return;
    e.preventDefault();
    this.firstFocusableElement.focus();
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.eventFunction);
  }
}
