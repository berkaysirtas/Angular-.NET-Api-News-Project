import { ConfirmDialogComponent } from './../../dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './../../../services/myAlert.service';
import { KategoriDialogComponent } from './../../dialogs/kategori-dialog/kategori-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { Kategori } from './../../../models/Kategori';
import { ApiService } from './../../../services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-kategori',
  templateUrl: './admin-kategori.component.html',
  styleUrls: ['./admin-kategori.component.css']
})
export class AdminKategoriComponent implements OnInit {
  kategoriler!: Kategori[];
  dataSource: any;
  displayedColumns=['KategoriAdi','KatHaberSay','detay'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef!:MatDialogRef<KategoriDialogComponent>;
  dialogRefConfirm!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
      this.kategoriler = d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle(){
    var yeniKayit: Kategori = new  Kategori();
    this.dialogRef=this.matDialog.open(KategoriDialogComponent, {
      width:'400px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.KategoriEkle(d).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KategoriListele();
          }
        });
      }
    });

  }
  Duzenle(kayit:Kategori){
    this.dialogRef=this.matDialog.open(KategoriDialogComponent, {
      width:'400px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        kayit.KategoriAdi=d.KategoriAdi;
        this.apiServis.KategoriDuzenle(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KategoriListele();
          }
        });
      }
    });
  }

  Sil(kayit:Kategori){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent, {
      width:'400px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.KategoriAdi + " Kategorisi Silinecektir.Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.KategoriSil(kayit.KategoriId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KategoriListele();
          }
        });
      }
    });
  }

}
