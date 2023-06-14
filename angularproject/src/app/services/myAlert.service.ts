import { AlertDialogComponent } from './../components/dialogs/alert-dialog/alert-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class MyAlertService {
  private AlertDialogRef!: MatDialogRef<AlertDialogComponent>;

  constructor(
    private matDialog: MatDialog
  ) { }

  AlertUygula(s: Sonuc) {
    var baslik = "";
    if (s.islem) {
      baslik = "İşlem Tamam";
    } else {
      baslik = "Hata";
    }
    this.AlertDialogRef = this.matDialog.open(AlertDialogComponent,{
      width: '300px'
    });
    this.AlertDialogRef.componentInstance.dialogBaslik=baslik;
    this.AlertDialogRef.componentInstance.dialogMesaj=s.mesaj;
    this.AlertDialogRef.componentInstance.dialogIslem=s.islem;

// this.AlertDialogRef.afterClosed().subscribe(d => {
//   this.AlertDialogRef = null;
// });


    this.AlertDialogRef.afterClosed().subscribe(() => {
      if (this.AlertDialogRef) {
        this.AlertDialogRef.close();
        //this.AlertDialogRef = undefined;
      }
    });
    


  }
}
