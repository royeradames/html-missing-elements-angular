import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-dialog', templateUrl: './dialog.component.html', styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements AfterViewInit, OnDestroy {

  firstFocusableElement!: HTMLElement
  lastFocusableElement!: HTMLElement
  @Input() previousFocusElement: HTMLElement | null = null;
  @ViewChild('closeButton', {static: false}) closeButton!: ElementRef;
  @ViewChild('dialog', {static: false}) dialog!: ElementRef;
  @Output() onClose = new EventEmitter<void>();
  @Output() onOpen = new EventEmitter<void>();
  eventFunction = this.captureTabbing.bind(this)
  private contentObserver?: MutationObserver;

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
    this.open();
    this.observeContentChanges();
  }

  open() {
    this.closeButton.nativeElement.focus();
    this.captureFocus();
    this.onOpen.emit()
  }

  observeContentChanges() {
    this.contentObserver = new MutationObserver((mutations) => this.onContentChange(mutations));

    this.contentObserver.observe(this.dialog.nativeElement, {
      attributes: false, childList: true, subtree: true
    });
  }

  onContentChange(mutations: MutationRecord[]) {
    for (let mutation of mutations) {
      const isContentUpdated = mutation.type === 'childList';
      if (!isContentUpdated) continue;
      this.handleContentChange();
      break;
    }
  }
  handleContentChange() {
    this.updateLastFocusableElement();
    this.firstFocusableElement.focus();
  }


  updateLastFocusableElement() {
    this.lastFocusableElement = this.getLastFocusableElement();
  }

  close() {
    this.previousFocusElement?.focus();
    this.onClose.emit();
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
    this.contentObserver?.disconnect()
  }
}
