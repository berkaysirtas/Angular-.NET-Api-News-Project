using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haberblog.ViewModel
{
	public class YorumModel
	{
		public int YorumId { get; set; }
		public string YorumIcerik { get; set; }
		public int UyeId { get; set; }
		public int HaberId { get; set; }
		public System.DateTime Tarih { get; set; }
		public string KullaniciAdi { get; set; }
		public string HaberBaslik { get; set; }

	}
}