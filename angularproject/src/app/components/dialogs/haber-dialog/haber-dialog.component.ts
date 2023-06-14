import { ApiService } from 'src/app/services/api.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Haber } from './../../../models/Haber';
import { Component, Inject, OnInit } from '@angular/core';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-haber-dialog',
  templateUrl: './haber-dialog.component.html',
  styleUrls: ['./haber-dialog.component.css']
})
export class HaberDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit!: Haber;
  islem!: string;
  frm!: FormGroup;
  kategoriler!: Kategori[];
  Jconfig = {};
  constructor(
    public apiServis:ApiService,
    public dialogRef: MatDialogRef<HaberDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;

    if (this.islem == "ekle"){
      this.dialogBaslik="Haber Ekle";
      this.yeniKayit=new Haber();
    }
    if (this.islem == "duzenle"){
      this.dialogBaslik="Haber Düzenle";
      this.yeniKayit=data.kayit;
    }
    if (this.islem == "detay"){
      this.dialogBaslik="Haber Detay";
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      Baslik: [this.yeniKayit.Baslik],
      Icerik: [this.yeniKayit.Icerik],
      KategoriId: [this.yeniKayit.KategoriId],
      FotoUrl: [this.yeniKayit.FotoUrl]
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe((d:any)=>{
      this.kategoriler = d;
    });
  }

}
