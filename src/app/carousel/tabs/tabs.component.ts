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
  carouselItems: SlideInterface[] = [
    {
    id: 1,
    href: '#',
    imgSrc: 'https://picsum.photos/id/237/200/300',
    alt: 'Image description 1',
    captionHref: '#',
    captionTitle: 'Caption title 1',
    captionDescription: 'Caption description 1'
  },
    {
      id: 2,
      href: '#',
      imgSrc: 'https://picsum.photos/id/238/200/300',
      alt: 'Image description 2',
      captionHref: '#',
      captionTitle: 'Caption title 2',
      captionDescription: 'Caption description 2'
    },
    {
      id: 3,
      href: '#',
      imgSrc: 'https://picsum.photos/id/239/200/300',
      alt: 'Image description 3',
      captionHref: '#',
      captionTitle: 'Caption title 3',
      captionDescription: 'Caption description 3'
    },
    {
      id: 4,
      href: '#',
      imgSrc: 'https://picsum.photos/id/240/200/300',
      alt: 'Image description 4',
      captionHref: '#',
      captionTitle: 'Caption title 4',
      captionDescription: 'Caption description 4'
    },
    {
      id: 5,
      href: '#',
      imgSrc: 'https://picsum.photos/id/241/200/300',
      alt: 'Image description 5',
      captionHref: '#',
      captionTitle: 'Caption title 5',
      captionDescription: 'Caption description 5'
    },
    {
      id: 6,
      href: '#',
      imgSrc: 'https://picsum.photos/id/242/200/300',
      alt: 'Image description 6',
      captionHref: '#',
      captionTitle: 'Caption title 6',
      captionDescription: 'Caption description 6'
    },
    {
      id: 7,
      href: '#',
      imgSrc: 'https://picsum.photos/id/243/200/300',
      alt: 'Image description 7',
      captionHref: '#',
      captionTitle: 'Caption title 7',
      captionDescription: 'Caption description 7'
    },
    {
      id: 8,
      href: '#',
      imgSrc: 'https://picsum.photos/id/244/200/300',
      alt: 'Image description 8',
      captionHref: '#',
      captionTitle: 'Caption title 8',
      captionDescription: 'Caption description 8'
    },
    {
      id: 9,
      href: '#',
      imgSrc: 'https://picsum.photos/id/245/200/300',
      alt: 'Image description 9',
      captionHref: '#',
      captionTitle: 'Caption title 9',
      captionDescription: 'Caption description 9'
    },
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
