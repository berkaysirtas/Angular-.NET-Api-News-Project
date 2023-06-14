import { Yorum } from './../../models/Yorum';
import { Haber } from './../../models/Haber';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-haber',
  templateUrl: './haber.component.html',
  styleUrls: ['./haber.component.css']
})
export class HaberComponent implements OnInit {
  haberId!: number;
  haber!: Haber;
  yorumlar!: Yorum[];
  constructor(
    public apiServis: ApiService,
    public route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if (p['haberId']){
        this.haberId = p['haberId'];
        this.HaberById();
        this.HaberYorumListe();
      }

    });
  }

  HaberById(){
    this.apiServis.HaberById(this.haberId).subscribe((d:any)=>{
      this.haber = d;
      this.HaberOkunduYap();
    });
  }
  HaberOkunduYap(){
    this.haber.Okunma += 1;
    this.apiServis.HaberDuzenle(this.haber).subscribe();
  }
  HaberYorumListe(){
    this.apiServis.YorumListeByHaberId(this.haberId).subscribe((d:any)=>{
      this.yorumlar = d;
    });
  }

  YorumEkle(yorumMetni:string){
    var yorum: Yorum = new Yorum();
    var uyeId: number=parseInt(localStorage.getItem("uid")!);
    yorum.HaberId = this.haberId;
    yorum.UyeId = uyeId;
    yorum.YorumIcerik = yorumMetni;
    yorum.Tarih = new Date();

    this.apiServis.YorumEkle(yorum).subscribe((d:any)=>{
      if (d.islem){
        this.HaberYorumListe();
      }
    });
  }

}
