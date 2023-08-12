import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DialogComponent} from './dialog/dialog.component';
import {ButtonComponent} from './button/button.component';
import {
  DialogWithLastFousAbleElementComponent
} from "./dialogWithLastFocusableItem/dialog-with-last-focusable-element.component";
import {Modal} from "./modal/modal.component";
import {ModernDialogComponent} from "./modernDialog/modern-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ButtonComponent,
    DialogWithLastFousAbleElementComponent,
    Modal,
    ModernDialogComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
