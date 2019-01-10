import { Component } from "@angular/core";
import { MatDialogRef } from "@angular/material";
import { NotificationService } from "src/services/notifications/notification.service";
import { FileuploadService } from "src/services/fileUpload-service/fileupload.service";

@Component({
  selector: "app-upload-image-modal",
  templateUrl: "./upload-image-modal.component.html",
  styleUrls: ["./upload-image-modal.component.scss"]
})
export class UploadImageModalComponent {
  isLoading: boolean = false
  isHovering: boolean;
  hoveringMessage: string = "Drag in profile image";
  filePath: string = "";
  formData: FormData = new FormData()
  constructor(public dialogRef: MatDialogRef<UploadImageModalComponent>, private _notify: NotificationService, private _fUpload: FileuploadService) { }

  onClick(): void {
    if (!this.isLoading) {
      this.dialogRef.close();
    }
  }

  toggleHover(event) {
    this.isHovering = event;
    if (event === true) {
      this.hoveringMessage = "Drop your image now";
    } else {
      this.hoveringMessage = "Drag in profile image";
    }
  }

  startUpload(event: FileList) {
    if (event.length === 1) {
      if (event[0].type.startsWith("image/")) {
        this.hoveringMessage = `Uploading ${event[0].name}`;
        const reader = new FileReader();
        reader.onload = e => {
          this.filePath = reader.result.toString();
        };
        reader.readAsDataURL(event[0]);
      }
    }
    else {
      this._notify.showInfo("You can only upload one file!")
    }
  }
}
