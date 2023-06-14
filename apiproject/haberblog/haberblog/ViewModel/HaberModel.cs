using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberblog.ViewModel
{
	public class HaberModel
	{
        public int HaberId { get; set; }
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public string FotoUrl { get; set; }
        public System.DateTime Tarih { get; set; }
        public int KategoriId { get; set; }
        public int UyeId { get; set; }
        public int Okunma { get; set; }
        public string KategoriAdi { get; set; }
        public string UyeKadi { get; set; }




    }
}