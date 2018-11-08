import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-upload-image-modal',
  templateUrl: './upload-image-modal.component.html',
  styleUrls: ['./upload-image-modal.component.scss']
})
export class UploadImageModalComponent {

  isHovering: boolean;
  hoveringMessage: string = 'Upload your profile image';
  filePath: string = '';
  constructor(public dialogRef: MatDialogRef<UploadImageModalComponent>) { }

  onClick(): void {
    this.dialogRef.close();
  }

  toggleHover(event) {
    this.isHovering = event;
    if (event === true) {
      this.hoveringMessage = "Drop your image now";
    }
    else {
      this.hoveringMessage = 'Upload your profile image';
    }
  }

  startUpload(event: FileList) {
    if (event.length === 1) {
      if (event[0].type.startsWith("image/")) {
        this.hoveringMessage = `Uploading ${event[0].name}`;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.filePath = reader.result.toString();
        }
        reader.readAsDataURL(event[0]);
      }
    }

  }

}
