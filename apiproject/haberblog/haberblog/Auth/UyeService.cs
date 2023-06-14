using haberblog.Models;
using haberblog.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberblog.Auth
{
    public class UyeService
    {
        DB01Entities db = new DB01Entities();

        public UyeModel UyeOturumAc(string kadi, string parola)
        {
            UyeModel uye = db.Uye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new UyeModel()
            {
                UyeId = x.UyeId,
                AdSoyad = x.AdSoyad,
                Email = x.Email,
                KullaniciAdi = x.KullaniciAdi,
                Sifre = x.Sifre,
                UyeAdmin = x.UyeAdmin
            }).SingleOrDefault();
            return uye;

        }
    }
}