import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActionConfirmDialogComponent } from "./action-confirm-dialog/action-confirm-dialog.component";
import { MaterialModule } from "../../../material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { EditImageDialogComponent } from "./edit-image-dialog/edit-image-dialog.component";
import { ImageCropperModule } from "ngx-image-cropper";

@NgModule({
  declarations: [
    ActionConfirmDialogComponent,
    EditImageDialogComponent,
  ],
    imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  exports: [
    ActionConfirmDialogComponent,
    EditImageDialogComponent,
  ],
  entryComponents: [
    ActionConfirmDialogComponent,
    EditImageDialogComponent,
  ],
})
export class DialogsModule {}
