import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {DialogComponent} from './dialogs/dialog/dialog.component';
import {ButtonComponent} from './button/button.component';
import {
  DialogWithLastFousAbleElementComponent
} from "./dialogs/dialogWithLastFocusableItem/dialog-with-last-focusable-element.component";
import {Modal} from "./dialogs/modal/modal.component";
import {ModernDialogComponent} from "./dialogs/modernDialog/modern-dialog.component";
import {ModernDialogWrapComponent} from "./dialogs/modernDialogWrap/modern-dialog-wrap.component";

@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    ButtonComponent,
    DialogWithLastFousAbleElementComponent,
    Modal,
    ModernDialogComponent,
    ModernDialogWrapComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
