import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  template: `
    <h1 mat-dialog-title>Sucesso!</h1>
    <div mat-dialog-content>
      <p>{{ data.message }}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="okay()">OK</button>
      <button mat-button (click)="activateDiagnosticSupport()">Ativar Suporte ao Diagnóstico</button>
    </div>
  `,
})

export class SuccessDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}


  activateDiagnosticSupport() {
    this.dialogRef.close(true);
  }


  okay() {
    this.dialogRef.close(false);
  }
}
