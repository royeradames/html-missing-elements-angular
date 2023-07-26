import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent {
  @Input() isOpen = false;

  toggleDialog() {
    this.isOpen = !this.isOpen;
  }
  openDialog() {
    this.isOpen = true;
  }

  action(e: KeyboardEvent) {
    if (e.keyCode === 27 || e.key === 'Escape') {
      this.isOpen = false;
    }
  }
}
