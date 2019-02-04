import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { NotificationService } from "src/services/notifications/notification.service";
import { FileuploadService } from "src/services/fileUpload-service/fileupload.service";
import { toBase64String } from "@angular/compiler/src/output/source_map";
import { Select } from "@ngxs/store";
import { UserState } from "src/redux/states/user.state";
import { Observable } from "rxjs";
import { IUser } from "src/models/user-model";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { Buffer } from "buffer";

@Component({
  selector: "app-upload-image-modal",
  templateUrl: "./upload-image-modal.component.html",
  styleUrls: ["./upload-image-modal.component.scss"]
})
export class UploadImageModalComponent implements OnInit {
  ngOnInit(): void {
    this.user$.subscribe(data => {
      this.userID = data.id;
    })
  }
  @Select(UserState.getUser) user$: Observable<IUser>;
  uploadedPercentage = 0;
  isUploading: boolean = false
  isLoading: boolean = false
  isHovering: boolean;
  hoveringMessage: string = "Drag in your image";
  filePath: string = "";
  formData: FormData = new FormData();
  userID: string;
  oldUrl: string;
  //The url that will be given to the image once uploaded
  fileUrl: string;
  constructor(public dialogRef: MatDialogRef<UploadImageModalComponent>, private _notify: NotificationService,
    private _fUpload: FileuploadService, @Inject(MAT_DIALOG_DATA) public data: { type: string, oldUrl: string }) { }

  toggleHover(event) {
    this.isHovering = event;
    if (event === true) {
      this.hoveringMessage = "Drop your image now";
    } else {
      this.hoveringMessage = "Drag in your image";
    }
  }

  startUpload(event: FileList) {
    this.isUploading = true;
    this.dialogRef.disableClose = true
    this.uploadedPercentage = 10;

    try {
      if (event.length === 1) {
        if (event[0].type.startsWith("image/")) {
          if (event[0].size > 5242880) {
            throw new Error("File is way too THICC!")
          }
          this.hoveringMessage = `Uploading ${event[0].name}`;

          const reader = new FileReader();
          reader.onload = e => {
            this.filePath = reader.result.toString();
            const base64 = btoa(reader.result.toString())
            this._fUpload.sendImage(base64, this.userID, this.data.oldUrl).subscribe((event: HttpEvent<any>) => {
              switch (event.type) {
                case HttpEventType.Sent:
                  console.log('Upload Started');
                  this.uploadedPercentage = 25;
                  break;
                case HttpEventType.Response:
                  this.uploadedPercentage = 100
                  this.isUploading = false;
                  console.log('Upload Complete');
                  this.fileUrl = event.body.url
                  console.log(this.fileUrl)

                  this._notify.showSuccess("Successful upload!", "Your avatar has been uploaded!")
                  setTimeout(() => {
                    this.uploadComplete()
                  }, 2000)
                  break;
                case 1:
                  if (Math.round(this.uploadedPercentage) !== Math.round(event['loaded'] / event['total'] * 100)) {
                    this.uploadedPercentage = event['loaded'] / event['total'] * 100;
                  }
                  break;
              }
            })
          };
          reader.readAsBinaryString(event[0]);
        }
      }
      else {
        throw new Error("One file only.")
      }
    }
    catch (error) {
      this.hoveringMessage = error.message
    }
  }

  uploadComplete() {
    this.dialogRef.disableClose = false
    this.dialogRef.close({ url: this.fileUrl });
  }
}
