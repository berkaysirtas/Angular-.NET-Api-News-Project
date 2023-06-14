import { Kategori } from './../../../models/Kategori';
import { HaberDialogComponent } from './../../dialogs/haber-dialog/haber-dialog.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { KategoriDialogComponent } from '../../dialogs/kategori-dialog/kategori-dialog.component';
import { Haber } from './../../../models/Haber';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin-haber',
  templateUrl: './admin-haber.component.html',
  styleUrls: ['./admin-haber.component.css']
})
export class AdminHaberComponent implements OnInit {
  haberler!: Haber[];
  kategoriler!: Kategori[];
  secKat!:Kategori;
  katId!: number;
  uyeId!: number ;
  dataSource: any;
  displayedColumns=['Baslik','Tarih','UyeKadi','Okunma','detay'];
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dialogRef!:MatDialogRef<HaberDialogComponent>;
  dialogRefConfirm!:MatDialogRef<ConfirmDialogComponent>;
  constructor(
    public apiServis:ApiService,
    public matDialog:MatDialog,
    public alert:MyAlertService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.uyeId= parseInt(localStorage.getItem("uid")!);
    this.route.params.subscribe(p=>{
      if (p['katId']){
        this.katId = p['katId'];
        this.KategoriById();
  
      }

    })
    this.HaberListele();
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:any)=>{
      this.secKat = d;     
      this.HaberListele();
    });
  }

 HaberListele(){
    this.apiServis.HaberListeByKatId(this.katId).subscribe((d:any)=>{
      this.haberler = d;
      this.dataSource= new MatTableDataSource(d);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
      this.kategoriler = d;
    });
  }
  KategoriSec(kat:Kategori){
    this.katId=kat.KategoriId;
    this.HaberListele();
  }

  Ekle(){
    var yeniKayit: Haber = new  Haber();
    this.dialogRef=this.matDialog.open(HaberDialogComponent, {
      width:'800px',
      data:{
        kayit: yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        yeniKayit =d;
        yeniKayit.Tarih=new Date();
        yeniKayit.Okunma=0;
        yeniKayit.UyeId = this.uyeId;
        //console.log(yeniKayit);
        this.apiServis.HaberEkle(yeniKayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.HaberListele();
          }
        });
      }
    });

  }
  Duzenle(kayit:Haber){
    this.dialogRef=this.matDialog.open(HaberDialogComponent, {
      width:'800px',
      data:{
        kayit: kayit,
        islem: 'duzenle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.HaberDuzenle(kayit).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.HaberListele();
          }
        });
      }
    });
  }

  Detay(kayit:Haber){
    this.dialogRef=this.matDialog.open(HaberDialogComponent, {
      width:'800px',
      data:{
        kayit: kayit,
        islem: 'detay'
      }
    });
  }
 

  Sil(kayit:Haber){
    this.dialogRefConfirm=this.matDialog.open(ConfirmDialogComponent, {
      width:'800px'
    });
    this.dialogRefConfirm.componentInstance.dialogMesaj = kayit.Baslik + " Başlıklı Haber Silinecektir.Onaylıyor Musunuz?";
    this.dialogRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.HaberSil(kayit.HaberId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.HaberListele();
          }
        });
      }
    });
  }

}
