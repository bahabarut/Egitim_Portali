import { Sonuc } from './../../models/Sonuc';
import { Uye } from './../../models/Uye';
import { MytoastService } from 'src/app/services/mytoast.service';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public dataServis: DataService, public toast: MytoastService) {}

  ngOnInit() {}

  OturumAc(mail: string, parola: string) {
    this.dataServis.OturumAc(mail, parola).subscribe((d) => {
      if (d.length > 0) {
        var kayit: Uye = d[0];
        localStorage.setItem('adSoyad', kayit.adSoyad);
        localStorage.setItem('rol', kayit.rol.toString());
        location.href = '/';
      } else {
        var sonuc: Sonuc = new Sonuc();
        sonuc.islem = false;
        sonuc.mesaj = 'E-Posta Adresi veya Parola Geçersizdir';
        this.toast.ToastUygula(sonuc);
      }
    });
  }
}
