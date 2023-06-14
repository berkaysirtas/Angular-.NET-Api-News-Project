import { Kategori } from './../../models/Kategori';
import { Haber } from './../../models/Haber';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
haberler!: Haber[];
katId!: number;
kat!: Kategori;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p['katId']){
        this.katId = p['katId'];
        this.KategoriById();
        this.HaberListeByKatId();
      }

    });
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:any)=>{ 
      this.kat = d;
    });
  }

  HaberListeByKatId(){
    this.apiServis.HaberListeByKatId(this.katId).subscribe((d:any)=>{
      this.haberler = d;
    });
  }

}
