using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using haberblog.Models;
using haberblog.ViewModel;

namespace haberblog.Controllers
{

   
    public class ServisController : ApiController
    {
        DB01Entities db = new DB01Entities();
        SonucModel sonuc = new SonucModel();


        #region Kategori 

        [HttpGet] 
        [Route("api/kategoriliste")]
       
        public List<KategoriModel> KategoriListe() 
        { 
            List<KategoriModel> liste = db.Kategori.Select(x => new KategoriModel() 
            { 
                KategoriId = x.KategoriId, 
                KategoriAdi = x.KategoriAdi, 
                KatHaberSay = x.Haber.Count() 
            
            }).ToList(); 
            
            return liste; 
        }

        [HttpGet] 
        [Route("api/kategoribyid/{katId}")] 
        public KategoriModel KategoriById(int katId) 
        { 
            KategoriModel kayit = db.Kategori.Where(s => s.KategoriId == katId).Select(x => new KategoriModel() 
            { 
                KategoriId = x.KategoriId, 
                KategoriAdi = x.KategoriAdi, 
                KatHaberSay = x.Haber.Count 

            }).SingleOrDefault(); 
            
            return kayit; 
        }


        [HttpPost]
        [Route("api/kategoriekle")]
        public SonucModel KategoriEkle(KategoriModel model)
        {
            if (db.Kategori.Count(s => s.KategoriAdi == model.KategoriAdi) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Girilen Kategori Adı Kayıtlıdır!"; 
                return sonuc; 
            }

            Kategori yeni = new Kategori(); 
            yeni.KategoriAdi = model.KategoriAdi; 
            
            db.Kategori.Add(yeni); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Kategori Eklendi"; 
            
            return sonuc;
        }

        [HttpPut] 
        [Route("api/kategoriduzenle")] 
        public SonucModel KategoriDuzenle(KategoriModel model) 
        { 
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == model.KategoriId).FirstOrDefault(); 
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı!"; 
                return sonuc; 
            } 
            
            kayit.KategoriAdi = model.KategoriAdi; 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Kategori Düzenlendi"; 

            return sonuc;
        }

        [HttpDelete] 
        [Route("api/kategorisil/{katId}")] 
        public SonucModel KategoriSil(int katId) 
        { 
            Kategori kayit = db.Kategori.Where(s => s.KategoriId == katId).FirstOrDefault(); 
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı!"; 
                return sonuc; 
            } 
            if (db.Haber.Count(s => s.KategoriId == katId) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Üzerinde Haber Kayıtlı Kategori Silinemez!";                
                return sonuc; 
            } 
            
            db.Kategori.Remove(kayit); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Kategori Silindi"; 
            
            return sonuc; 
        }

        #endregion



        #region Haber

        [HttpGet] 
        [Route("api/haberliste")] 
        public List<HaberModel> HaberListe() 
        { 
            List<HaberModel> liste = db.Haber.Select(x => new HaberModel() 
            { 
                HaberId = x.HaberId, 
                Baslik = x.Baslik, 
                Icerik = x.Icerik,
                FotoUrl = x.FotoUrl,
                KategoriId = x.KategoriId, 
                KategoriAdi = x.Kategori.KategoriAdi, 
                Okunma = x.Okunma, 
                Tarih = x.Tarih, 
                UyeId = x.UyeId, 
                UyeKadi = x.Uye.KullaniciAdi
            
            }).ToList(); 
            
            return liste; 
        }

        [HttpGet] 
        [Route("api/haberlistesoneklenenler/{s}")] 
        public List<HaberModel> HaberListeSonEklenenler(int s) 
        { 
            List<HaberModel> liste = db.Haber.OrderByDescending(o => o.HaberId).Take(s).Select(x => new HaberModel() 
            {
                
                HaberId = x.HaberId, 
                Baslik = x.Baslik, 
                Icerik = x.Icerik, 
                FotoUrl = x.FotoUrl, 
                KategoriId = x.KategoriId, 
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = x.Okunma, 
                Tarih = x.Tarih, 
                UyeId = x.UyeId, 
                UyeKadi = x.Uye.KullaniciAdi 

            }).ToList(); 

            return liste; 
        }

        [HttpGet]
        [Route("api/haberlistebykatid/{katId}")]
        public List<HaberModel> HaberListeByKatId(int katId)
        {
            List<HaberModel> liste = db.Haber.Where(s => s.KategoriId == katId).Select(x => new HaberModel()
            {
                HaberId = x.HaberId,
                Baslik = x.Baslik,
                Icerik = x.Icerik,
                FotoUrl = x.FotoUrl,
                KategoriId = x.KategoriId,
                KategoriAdi = x.Kategori.KategoriAdi,
                Okunma = x.Okunma,
                Tarih = x.Tarih,
                UyeId = x.UyeId,
                UyeKadi = x.Uye.KullaniciAdi
            
            }).ToList(); 
            
            return liste;
        }

        [HttpGet] 
        [Route("api/haberlistebyuyeid/{uyeId}")] 
        public List<HaberModel> MakaleListeByUyeId(int uyeId) 
        { 
            List<HaberModel> liste = db.Haber.Where(s => s.UyeId == uyeId).Select(x => new HaberModel() 
            { 
                HaberId = x.HaberId, 
                Baslik = x.Baslik, 
                Icerik = x.Icerik, 
                FotoUrl = x.FotoUrl, 
                KategoriId = x.KategoriId, 
                KategoriAdi = x.Kategori.KategoriAdi, 
                Okunma = x.Okunma, 
                Tarih = x.Tarih, 
                UyeId = x.UyeId, 
                UyeKadi = x.Uye.KullaniciAdi 

            }).ToList(); 
            
            return liste; 
        }

        [HttpGet] 
        [Route("api/haberbyid/{haberId}")] 
        public HaberModel HaberById(int haberId) 
        { 
            HaberModel kayit = db.Haber.Where(s => s.HaberId == haberId).Select(x => new HaberModel() 
            { 
                HaberId = x.HaberId,
                Baslik = x.Baslik, 
                Icerik = x.Icerik, 
                FotoUrl = x.FotoUrl, 
                KategoriId = x.KategoriId, 
                KategoriAdi = x.Kategori.KategoriAdi, 
                Okunma = x.Okunma, 
                Tarih = x.Tarih, 
                UyeId = x.UyeId, 
                UyeKadi = x.Uye.KullaniciAdi 
            
            }).SingleOrDefault(); 
            
            return kayit; 
        
        }

        [HttpPost]
        [Route("api/haberekle")]
        public SonucModel HaberEkle(HaberModel model)
        {
            if (db.Haber.Count(s => s.Baslik == model.Baslik) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Girilen Haber Başlığı Kayıtlıdır!"; 
                return sonuc; 
            }
            Haber yeni = new Haber(); 
            yeni.Baslik = model.Baslik; 
            yeni.Icerik = model.Icerik; 
            yeni.Tarih = model.Tarih; 
            yeni.Okunma = model.Okunma; 
            yeni.KategoriId = model.KategoriId; 
            yeni.UyeId = model.UyeId; 
            yeni.FotoUrl = model.FotoUrl; 

            db.Haber.Add(yeni); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Haber Eklendi"; 
            
            return sonuc;
        }

        [HttpPut] 
        [Route("api/haberduzenle")] 
        public SonucModel HaberDuzenle(HaberModel model) 
        { 
            Haber kayit = db.Haber.Where(s => s.HaberId == model.HaberId).SingleOrDefault(); 
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı!"; 
                return sonuc; 
            } 
            
            kayit.Baslik = model.Baslik; 
            kayit.Icerik = model.Icerik; 
            kayit.Tarih = model.Tarih; 
            kayit.Okunma = model.Okunma; 
            kayit.KategoriId = model.KategoriId; 
            kayit.UyeId = model.UyeId; 
            kayit.FotoUrl = model.FotoUrl; 
            
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Haber Düzenlendi"; 
            
            return sonuc; 
        }

        [HttpDelete]
        [Route("api/habersil/{haberId}")]
        public SonucModel HaberSil(int haberId)
        {
            Haber kayit = db.Haber.Where(s => s.HaberId == haberId).SingleOrDefault(); 
            if (kayit == null)
            {
                sonuc.islem = false;
                sonuc.mesaj = "Kayıt Bulunamadı!"; 
                return sonuc;
            }
            if (db.Yorum.Count(s => s.HaberId == haberId) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Üzerinde Yorum Kayıtlı Haber Silinemez!"; 
                return sonuc; 
            }

            db.Haber.Remove(kayit); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Haber Silindi"; 
            
            return sonuc;
        }

        #endregion



        #region Üye

        [HttpGet] 
        [Route("api/uyeliste")] 
        public List<UyeModel> UyeListe() 
        { 
            List<UyeModel> liste = db.Uye.Select(x => new UyeModel() 
            { 
                UyeId = x.UyeId, 
                AdSoyad = x.AdSoyad, 
                Email = x.Email, 
                KullaniciAdi = x.KullaniciAdi,
                Sifre = x.Sifre, 
                UyeAdmin = x.UyeAdmin 
            
            }).ToList(); 
            
            return liste; 
        }

        [HttpGet] 
        [Route("api/uyebyid/{uyeId}")] 
        public UyeModel UyeById(int uyeId) 
        { 
            UyeModel kayit = db.Uye.Where(s => s.UyeId == uyeId).Select(x => new UyeModel() 
            { 
                UyeId = x.UyeId, 
                AdSoyad = x.AdSoyad, 
                Email = x.Email, 
                KullaniciAdi = x.KullaniciAdi,
                Sifre = x.Sifre, 
                UyeAdmin = x.UyeAdmin
                
            }).SingleOrDefault(); 
            
            return kayit; 
        }

        [HttpPost] 
        [Route("api/uyeekle")] 
        public SonucModel UyeEkle(UyeModel model) 
        { 
            if (db.Uye.Count(s => s.KullaniciAdi == model.KullaniciAdi || s.Email == model.Email) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Girilen Kullanıcı Adı veya E-Posta Adresi Kayıtlıdır!"; 
                return sonuc; 
            } 
            Uye yeni = new Uye(); 
            yeni.AdSoyad = model.AdSoyad; 
            yeni.Email = model.Email; 
            yeni.KullaniciAdi = model.KullaniciAdi; 
            yeni.Sifre = model.Sifre;
            yeni.UyeAdmin = model.UyeAdmin;
            
            db.Uye.Add(yeni); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Üye Eklendi"; 
            
            return sonuc; 
        }

        [HttpPut] 
        [Route("api/uyeduzenle")] 
        public SonucModel UyeDuzenle(UyeModel model) 
        { 
            Uye kayit = db.Uye.Where(s => s.UyeId == model.UyeId).SingleOrDefault(); 
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı"; 
                return sonuc; 
            } 
            kayit.AdSoyad = model.AdSoyad; 
            kayit.Email = model.Email; 
            kayit.KullaniciAdi = model.KullaniciAdi;  
            kayit.Sifre = model.Sifre; 
            kayit.UyeAdmin = model.UyeAdmin; 
            
            db.SaveChanges(); 
            sonuc.islem = true; 
            sonuc.mesaj = "Üye Düzenlendi"; 
            
            return sonuc; 
        }

        [HttpDelete]
        [Route("api/uyesil/{uyeId}")]
        public SonucModel UyeSil(int uyeId)
        {
            Uye kayit = db.Uye.Where(s => s.UyeId == uyeId).SingleOrDefault();
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı"; 
                return sonuc; 
            }
            if (db.Haber.Count(s => s.UyeId == uyeId) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Üzerinde Haber Kaydı Olan Üye Silinemez!"; 
                return sonuc; 
            }
            if (db.Yorum.Count(s => s.UyeId == uyeId) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Üzerinde Yorum Kaydı Olan Üye Silinemez!"; 
                return sonuc; 
            }
            db.Uye.Remove(kayit); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Üye Silindi"; 
            
            return sonuc;
        }

		#endregion



		#region Yorum

		[HttpGet] 
        [Route("api/yorumliste")] 
        public List<YorumModel> YorumListe() 
        { 
            List<YorumModel> liste = db.Yorum.Select(x => new YorumModel() 
            { 
                YorumId = x.YorumId, 
                YorumIcerik = x.YorumIcerik, 
                HaberId = x.HaberId, 
                UyeId = x.UyeId, 
                Tarih = x.Tarih, 
                KullaniciAdi = x.Uye.KullaniciAdi, 
                HaberBaslik = x.Haber.Baslik, 
            
            }).ToList(); 
            
            return liste; 
        }

        [HttpGet]
        [Route("api/yorumlistebyuyeid/{uyeId}")]
        public List<YorumModel> YorumListeByUyeId(int uyeId)
        {
            List<YorumModel> liste = db.Yorum.Where(s => s.UyeId == uyeId).Select(x => new YorumModel()
            {
                YorumId = x.YorumId,
                YorumIcerik = x.YorumIcerik,
                HaberId = x.HaberId,
                UyeId = x.UyeId,
                Tarih = x.Tarih,
                KullaniciAdi = x.Uye.KullaniciAdi,
                HaberBaslik = x.Haber.Baslik,

            }).ToList(); 
            
            return liste;
        }

        [HttpGet] 
        [Route("api/yorumlistebyhaberid/{haberId}")] 
        public List<YorumModel> YorumListeByhaberId(int haberId) 
        { 
            List<YorumModel> liste = db.Yorum.Where(s => s.HaberId == haberId).Select(x => new YorumModel() 
            { 
                YorumId = x.YorumId, 
                YorumIcerik = x.YorumIcerik, 
                HaberId = x.HaberId, 
                UyeId = x.UyeId, 
                Tarih = x.Tarih, 
                KullaniciAdi = x.Uye.KullaniciAdi, 
                HaberBaslik = x.Haber.Baslik,
            
            }).ToList(); 
            
            return liste; 
        }

        [HttpGet] 
        [Route("api/yorumlistesoneklenenler/{s}")] 
        public List<YorumModel> YorumListeSonEklenenler(int s) 
        { 
            List<YorumModel> liste = db.Yorum.OrderByDescending(o => o.HaberId).Take(s).Select(x => new YorumModel() 
            { 
                YorumId = x.YorumId, 
                YorumIcerik = x.YorumIcerik,
                HaberId = x.HaberId, 
                UyeId = x.UyeId, 
                Tarih = x.Tarih, 
                KullaniciAdi = x.Uye.KullaniciAdi, 
                HaberBaslik = x.Haber.Baslik, 

            }).ToList(); 
            
            return liste; 
        }

        [HttpGet]
        [Route("api/yorumbyid/{yorumId}")]
        public YorumModel YorumById(int yorumId)
        {
            YorumModel kayit = db.Yorum.Where(s => s.YorumId == yorumId).Select(x => new YorumModel()            
            {
               YorumId = x.YorumId,                    
               YorumIcerik = x.YorumIcerik,                
               HaberId = x.HaberId,                
               UyeId = x.UyeId,                
               Tarih = x.Tarih,                
               KullaniciAdi = x.Uye.KullaniciAdi,
               HaberBaslik = x.Haber.Baslik,
                    
            }).SingleOrDefault();

			return kayit;
        }

        [HttpPost] 
        [Route("api/yorumekle")] 
        public SonucModel YorumEkle(YorumModel model) 
        { 
            if (db.Yorum.Count(s => s.UyeId == model.UyeId && s.HaberId == model.HaberId && s.YorumIcerik == model.YorumIcerik) > 0) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Aynı Kişi, Aynı Habere Aynı Yorumu Yapamaz!"; 
                return sonuc; 
            } 
            Yorum yeni = new Yorum(); 
            yeni.YorumId = model.YorumId; 
            yeni.YorumIcerik = model.YorumIcerik; 
            yeni.HaberId = model.HaberId; 
            yeni.UyeId = model.UyeId; 
            yeni.Tarih = model.Tarih; 

            db.Yorum.Add(yeni); 
            db.SaveChanges(); 
            
            sonuc.islem = true; 
            sonuc.mesaj = "Yorum Eklendi"; 
            
            return sonuc; 
        }

        [HttpPut]
        [Route("api/yorumduzenle")]
        public SonucModel YorumDuzenle(YorumModel model)
        {
            Yorum kayit = db.Yorum.Where(s => s.YorumId == model.YorumId).SingleOrDefault(); 
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı!"; 
                return sonuc; 
            }
            kayit.YorumId = model.YorumId; 
            kayit.YorumIcerik = model.YorumIcerik; 
            kayit.HaberId = model.HaberId; 
            kayit.UyeId = model.UyeId; 
            kayit.Tarih = model.Tarih; 
            
            db.SaveChanges(); 
            sonuc.islem = true; 
            sonuc.mesaj = "Yorum Düzenlendi"; 
            
            return sonuc;
        }

        [HttpDelete] 
        [Route("api/yorumsil/{yorumId}")]
        public SonucModel YorumSil(int yorumId) 
        { 
            Yorum kayit = db.Yorum.Where(s => s.YorumId == yorumId).SingleOrDefault(); 
            if (kayit == null) 
            { 
                sonuc.islem = false; 
                sonuc.mesaj = "Kayıt Bulunamadı!"; 
                return sonuc; 
            }
            
            db.Yorum.Remove(kayit); 
            db.SaveChanges();
            
            sonuc.islem = true; 
            sonuc.mesaj = "Yorum Silindi"; 
            
            return sonuc; 
        
        }


        #endregion


    }
}

