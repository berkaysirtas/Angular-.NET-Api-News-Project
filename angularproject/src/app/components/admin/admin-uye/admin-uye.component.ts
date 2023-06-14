import { ApiService } from './../../../services/api.service';
import { UyeDialogComponent } from './../../dialogs/uye-dialog/uye-dialog.component';
import { MatSort } from '@angular/material/sort';
import { Uye } from './../../../models/Uye';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-uye',
  templateUrl: './admin-uye.component.html',
  styleUrls: ['./admin-uye.component.css']
})
export class AdminUyeComponent implements OnInit {
  uyeler!: Uye[];
  dataSource: any;
  displayedColumns=['KullaniciAdi','Email','AdSoyad','UyeAdmin','detay'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef!:MatDialogRef<UyeDialogComponent>;
  dialogRefConfirm!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis: ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService
  ) { }

  ngOnInit() {
    this.UyeListele();
  }

  UyeListele(){
    this.apiServis.UyeListe().subscribe((d:any)=>{
      this.uyeler = d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle(){
    var yeniKayit: Uye = new  Uye();
    this.dialogRef=this.matDialog.open(UyeDialogComponent, {
      width:'400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.UyeEkle(d).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.UyeListele();
          }
        });
      }
    });

  }
  Duzenle(kayit:Uye){
    this.dialogRef=this.matDialog.open(UyeDialogComponent, {
      width:'400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        kayit.KullaniciAdi=d.KullaniciAdi;
        kayit.Email=d.Email;
        kayit.Sifre=d.Sifre;
        kayit.AdSoyad=d.AdSoyad;
        kayit.UyeAdmin=d.UyeAdmin;
        this.apiServis.UyeDuzenle(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }

  Sil(kayit:Uye){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent, {
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.KullaniciAdi + " Adlı Kullanıcı Silinecektir.Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.UyeSil(kayit.UyeId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.UyeListele();
          }
        });
      }
    });
  }

}