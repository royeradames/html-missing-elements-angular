import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class Modal implements AfterViewInit, OnDestroy {

  @Input() previousFocusElement?: HTMLElement;
  @Input() label = 'Dialog';
  @Input() isCloseOnBackgroundClick = true;
  @ViewChild('closeButton', {static: false}) closeButton!: ElementRef;
  @ViewChild('lastElement', {static: false}) lastElement!: ElementRef;
  @ViewChild('dialog', {static: false}) dialog!: ElementRef;
  @Output() onClose = new EventEmitter<void>();
  @Output() onOpen = new EventEmitter<void>();
  eventFunction = this.captureTabbing.bind(this)
  firstFocusableElement!: HTMLElement
  lastFocusableElement!: HTMLElement
  contentObserver?: MutationObserver;
  liveMessage: string = '';


  ngAfterViewInit(): void {
    this.open();
  }

  open() {
    this.liveMessage = 'Dialog opened. Press escape to close.';
    this.closeButton.nativeElement.focus();
    this.captureFocus();
    this.onOpen.emit()
  }

  close() {
    this.liveMessage = 'Dialog closed.';
    this.previousFocusElement?.focus();
    this.onClose.emit();
  }

  backgroundClose() {
    if (!this.isCloseOnBackgroundClick) return;
    this.close();
  }

  closeOnEscape(e: KeyboardEvent) {
    const isEscPressed = e.key === 'Escape' || e.keyCode === 27;
    if (!isEscPressed) return;
    this.close();
  }

  captureFocus() {
    this.firstFocusableElement = this.closeButton.nativeElement;
    this.lastFocusableElement = this.lastElement.nativeElement;
    document.addEventListener('keydown', this.eventFunction);
  }

  isTabPressed(e: KeyboardEvent): boolean {
    const KEYCODE_TAB = 9;
    return e.key === 'Tab' || e.keyCode === KEYCODE_TAB;
  }

  captureTabbing(e: KeyboardEvent) {
    if (!this.isTabPressed(e)) return;
    if (this.shouldFocusOnLastElement(e)) {
      e.preventDefault();
      this.lastFocusableElement.focus();
      return;
    }
    if (!this.shouldFocusOnFirstElement()) return;
    e.preventDefault();
    this.firstFocusableElement.focus();
  }

  shouldFocusOnLastElement(e: KeyboardEvent): boolean {
    return e.shiftKey && document.activeElement === this.closeButton.nativeElement;
  }

  shouldFocusOnFirstElement(): boolean {
    return document.activeElement === this.lastFocusableElement;
  }

  focusOnFirstElement() {
    this.firstFocusableElement.focus()
  }

  ngOnDestroy(): void {
    document.removeEventListener('keydown', this.eventFunction);
    this.contentObserver?.disconnect()
  }
}
