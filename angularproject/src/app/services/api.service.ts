import { Yorum } from './../models/Yorum';
import { Uye } from './../models/Uye';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Haber } from '../models/Haber';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl= "https://localhost:44377/api/";
  siteUrl="https://localhost:44377/";
constructor(
  public http:HttpClient
) { }

//oturum açma kısmı

tokenAl(kadi:string,parola:string){
  var data="username=" + kadi + "&password=" + parola + "&grant_type=password";
  var reqHeader=new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
  return this.http.post(this.apiUrl+"/token",data,{headers:reqHeader});
}
oturumKontrol(){
  if (localStorage.getItem("token")){
    return true;
  }
  else {
    return false;
  }
}

yetkiKontrol(yetkiler: any){
  var sonuc: boolean = false;

  var uyeYetkiler: string[] =JSON.parse(localStorage.getItem("uyeYetkileri")!);

  if (uyeYetkiler){
    yetkiler.forEach((element: any): any => {
      if (uyeYetkiler.indexOf(element) > -1){
        sonuc=true;
        return false;
      }
    });
  }

  return sonuc;

}

//api servisleri
  //kategori

  KategoriListe(){
    return this.http.get(this.apiUrl+"/kategoriliste");
  }
  KategoriById(katId:number){
    return this.http.get(this.apiUrl+"/kategoribyid/" + katId);
  }
  KategoriEkle(kat:Kategori){
    return this.http.post(this.apiUrl+"/kategoriekle",kat);
  }
  KategoriDuzenle(kat:Kategori){
    return this.http.put(this.apiUrl+"/kategoriduzenle",kat);
  }
  KategoriSil(katId:number){
    return this.http.delete(this.apiUrl+"/kategorisil/" + katId);
  }

  //haber

  HaberListe(){
    return this.http.get(this.apiUrl+"/haberliste");
  }
  HaberListeSonEklenenler(s:number){
    return this.http.get(this.apiUrl+"/haberlistesoneklenenler/" + s);
  }
  HaberListeByKatId(katId:number){
    return this.http.get(this.apiUrl+"/haberlistebykatid/" + katId);
  }
  HaberListeByUyeId(uyeId:number){
    return this.http.get(this.apiUrl+"/haberlistebyuyeid/" + uyeId);
  }
  HaberById(haberId:number){
    return this.http.get(this.apiUrl+"/haberbyid/" + haberId);
  }
  HaberEkle(haber:Haber){
    return this.http.post(this.apiUrl+"/haberekle",haber);
  }
  HaberDuzenle(haber:Haber){
    return this.http.put(this.apiUrl+"/haberduzenle",haber);
  }
  HaberSil(haberId:number){
    return this.http.delete(this.apiUrl+"/habersil/" + haberId);
  }

  //üye

  UyeListe(){
    return this.http.get(this.apiUrl+"/uyeliste");
  }
  UyeById(uyeId:number){
    return this.http.get(this.apiUrl+"/uyebyid/" + uyeId);
  }
  UyeEkle(uye:Uye){
    return this.http.post(this.apiUrl+"/uyeekle",uye);
  }
  UyeDuzenle(uye:Uye){
    return this.http.put(this.apiUrl+"/uyeduzenle",uye);
  }
  UyeSil(uyeId:number){
    return this.http.delete(this.apiUrl+"/uyesil/" + uyeId);
  }

  //yorum

  YorumListe(){
    return this.http.get(this.apiUrl+"/yorumliste");
  }
  YorumListeSonEklenenler(s:number){
    return this.http.get(this.apiUrl+"/yorumlistesoneklenenler/" + s);
  }
  YorumListeByHaberId(haberId:number){
    return this.http.get(this.apiUrl+"/yorumlistebyhaberid/" + haberId);
  }
  YorumListeByUyeId(uyeId:number){
    return this.http.get(this.apiUrl+"/yorumlistebyuyeid/" + uyeId);
  }
  YorumById(yorumId:number){
    return this.http.get(this.apiUrl+"/yorumbyid/" + yorumId);
  }
  YorumEkle(yorum:Yorum){
    return this.http.post(this.apiUrl+"/yorumekle",yorum);
  }
  YorumDuzenle(yorum:Yorum){
    return this.http.put(this.apiUrl+"/yorumduzenle",yorum);
  }
  YorumSil(yorumId:number){
    return this.http.delete(this.apiUrl+"/yorumsil/" + yorumId);
  }

}
