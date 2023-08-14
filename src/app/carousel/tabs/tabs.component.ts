import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";

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
export class TabsComponent implements OnInit{
  carouselItems: SlideInterface[] = [{
    id: 1,
    href: '#',
    imgSrc: 'https://picsum.photos/id/237/200/300',
    alt: 'Image description 1',
    captionHref: '#',
    captionTitle: 'Caption title 1',
    captionDescription: 'Caption description 1'
  }, // ... Add other carousel items here
  ];
  isAutoPlayOn?: boolean;
  selectedSlide?: SlideInterface;
  // If operating system preferences have been set for reduced motion or disabling animations, the auto-rotation is initially paused.
  isPause = new BehaviorSubject<boolean>(false);
  pauseButtonLabel!: string;

  constructor() {
    // If operating system preferences have been set for reduced motion or disabling animations, the auto-rotation is initially paused.
    // isPause = false;
  }

  ngOnInit(): void {
      this.handlePauseButtonLabel(this.isPause.value)
      this.isPause.subscribe((isPause) => {
        this.handlePauseButtonLabel(isPause);
      }
    );
    }

  handlePauseButtonLabel(isPause: boolean) {
    this.pauseButtonLabel = isPause ? 'End Automatic slide show' : 'Start Automatic slide show';
  }

  handleSlidesAnnouncement(): 'off' | "polite" {
    return this.isAutoPlayOn ? 'off' : 'polite';
  }

  activate() {
    // activate the slide
  }

  getIdRef(id: SlideInterface['id']) {
    return 'carousel-item-' + id;
  }


}
