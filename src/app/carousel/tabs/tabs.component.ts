import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject, switchMap, takeUntil, timer} from "rxjs";

interface SlideInterface {
  id: number,
  href: string,
  imgSrc: string,
  alt: string,
  captionHref: string,
  captionTitle: string,
  captionDescription: string
}

@Component({
  selector: 'app-tabs', templateUrl: './tabs.component.html', styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit, OnDestroy {
  carouselItems: SlideInterface[] = [{
    id: 1,
    href: '#',
    imgSrc: 'https://picsum.photos/id/237/1280',
    alt: 'Image description 1',
    captionHref: '#',
    captionTitle: 'Caption title 1',
    captionDescription: 'Caption description 1'
  }, {
    id: 2,
    href: '#',
    imgSrc: 'https://picsum.photos/id/238/1280',
    alt: 'Image description 2',
    captionHref: '#',
    captionTitle: 'Caption title 2',
    captionDescription: 'Caption description 2'
  }, {
    id: 3,
    href: '#',
    imgSrc: 'https://picsum.photos/id/239/1280',
    alt: 'Image description 3',
    captionHref: '#',
    captionTitle: 'Caption title 3',
    captionDescription: 'Caption description 3'
  }, {
    id: 4,
    href: '#',
    imgSrc: 'https://picsum.photos/id/240/1280',
    alt: 'Image description 4',
    captionHref: '#',
    captionTitle: 'Caption title 4',
    captionDescription: 'Caption description 4'
  }, {
    id: 5,
    href: '#',
    imgSrc: 'https://picsum.photos/id/241/1280',
    alt: 'Image description 5',
    captionHref: '#',
    captionTitle: 'Caption title 5',
    captionDescription: 'Caption description 5'
  }, {
    id: 6,
    href: '#',
    imgSrc: 'https://picsum.photos/id/242/1280',
    alt: 'Image description 6',
    captionHref: '#',
    captionTitle: 'Caption title 6',
    captionDescription: 'Caption description 6'
  }, {
    id: 7,
    href: '#',
    imgSrc: 'https://picsum.photos/id/243/1280',
    alt: 'Image description 7',
    captionHref: '#',
    captionTitle: 'Caption title 7',
    captionDescription: 'Caption description 7'
  }, {
    id: 8,
    href: '#',
    imgSrc: 'https://picsum.photos/id/244/1280',
    alt: 'Image description 8',
    captionHref: '#',
    captionTitle: 'Caption title 8',
    captionDescription: 'Caption description 8'
  },];
  isAutoPlayOn?: boolean;
  selectedSlide = this.carouselItems[0];
  // If operating system preferences have been set for reduced motion or disabling animations, the auto-rotation is initially paused.
  isPause = new BehaviorSubject<boolean>(false);
  pauseButtonLabel!: string;
  currentTab?: HTMLElement;
  // This subject will emit when the component is destroyed.
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.handlePauseButtonLabel(this.isPause.value)
    this.isPause.subscribe((isPause) => {
      this.handlePauseButtonLabel(isPause);
    });
    this.isPause
      .pipe(switchMap(isPause => isPause ? new Subject<void>() : timer(5000).pipe(switchMap(() => {
          this.selectedSlide = this.nextSlide();
          return new Subject<void>(); // Return a non-emitting observable after updating the slide.
        }))), takeUntil(this.destroy$) // Ensure we unsubscribe when the component is destroyed.
      )
      .subscribe();
  }

  nextSlide() {
    const index = this.slideIndex(this.selectedSlide)
    const nextSlide = this.carouselItems[index + 1];
    return nextSlide ? nextSlide : this.carouselItems[0];

  }

  slideIndex(slide: SlideInterface) {
    return this.carouselItems.findIndex((item) => item.id === slide.id);
  }

  handlePauseButtonLabel(isPause: boolean) {
    this.pauseButtonLabel = isPause ? 'End Automatic slide show' : 'Start Automatic slide show';
  }

  handleSlidesAnnouncement(): 'off' | "polite" {
    return this.isAutoPlayOn ? 'off' : 'polite';
  }

  activate(slide: SlideInterface): 0 | -1 {
    if (this.selectedSlide != slide) return -1;
    return 0;
  }

  getIdRef(id: SlideInterface['id']) {
    return 'carousel-item-' + id;
  }

  handleSlideTabClick(e: MouseEvent, slideTabElement: HTMLElement, slide: SlideInterface) {
    e.preventDefault();
    this.selectedSlide = slide;
    this.isAutoPlayOn = false;
    slideTabElement.focus();
  }

  ngOnDestroy(): void {
    // Emit a value when the component is destroyed.
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleArrowLeft($event: KeyboardEvent) {
    $event.preventDefault();
    this.selectedSlide = this.previousSlide();
    this.currentTabElement()?.focus();
  }

  handleArrowRight($event: KeyboardEvent) {
    $event.preventDefault();
    this.selectedSlide = this.nextSlide();
    this.currentTabElement()?.focus();
  }

  previousSlide() {
    const index = this.slideIndex(this.selectedSlide)
    const previousSlide = this.carouselItems[index - 1];
    return previousSlide ? previousSlide : this.carouselItems[this.carouselItems.length - 1];
  }

  currentTabElement() {
    const previousTabElement: HTMLElement | null = document.querySelector('#carousel-tab-' + this.selectedSlide?.id);
    if (!previousTabElement) return;
    return previousTabElement
  }
}
