import { FormBuilder, FormGroup } from '@angular/forms';
import { Uye } from './../../../models/Uye';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
  dialogBaslik!: string;
  yeniKayit!: Uye;
  islem!: string;
  frm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<UyeDialogComponent>,
    public frmBuild:FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.islem=data.islem;

    if (this.islem == "ekle"){
      this.dialogBaslik="Üye Ekle";
      this.yeniKayit=new Uye();
    }
    if (this.islem == "duzenle"){
      this.dialogBaslik=" Düzenle";
      this.yeniKayit=data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
  }
  FormOlustur(){
    return this.frmBuild.group({
      KullaniciAdi: [this.yeniKayit.KullaniciAdi],
      Email: [this.yeniKayit.Email],
      Sifre: [this.yeniKayit.Sifre],
      AdSoyad: [this.yeniKayit.AdSoyad],
      UyeAdmin: [this.yeniKayit.UyeAdmin]


    });
  }

}