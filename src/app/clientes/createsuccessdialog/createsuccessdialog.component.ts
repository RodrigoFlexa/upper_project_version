import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-createsuccessdialog',
  template: `
    <h2 mat-dialog-title>Confirmação</h2>
    <mat-dialog-content>{{ data.message }}</mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Ok</button>
    </mat-dialog-actions>
  `
})
export class CreatesuccessdialogComponent {
  constructor(
    public dialogRef: MatDialogRef<CreatesuccessdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}


}
