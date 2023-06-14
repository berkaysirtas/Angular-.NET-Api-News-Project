import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Haber } from 'src/app/models/Haber';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uyehaber',
  templateUrl: './uyehaber.component.html',
  styleUrls: ['./uyehaber.component.css']
})
export class UyehaberComponent implements OnInit {
  haberler!: Haber[];
  uyeId!: number;
  uye!: Uye;
    constructor(
      public apiServis: ApiService,
      public route: ActivatedRoute
    ) { }
  
    ngOnInit() {
      this.route.params.subscribe(p=>{
        if (p['uyeId']){
          this.uyeId = p['uyeId'];
          this.UyeById();
          this.HaberListeByUyeId();
        }
  
      });
    }
    UyeById(){
      this.apiServis.UyeById(this.uyeId).subscribe((d:any)=>{ 
        this.uye = d;
      });
    }
  
    HaberListeByUyeId(){
      this.apiServis.HaberListeByUyeId(this.uyeId).subscribe((d:any)=>{
        this.haberler = d;
      });
    }
  
  }
