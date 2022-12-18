import { Sonuc } from './../../models/Sonuc';
import { Uye } from './../../models/Uye';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import * as bootstrap from 'bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.scss'],
})
export class UyeComponent implements OnInit {
  uyeler!: Uye[];
  modal!: Modal;
  modalBaslik: string = '';
  secUye!: Uye;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adSoyad: new FormControl(),
    yas: new FormControl(),
    mail: new FormControl(),
    parola: new FormControl(),
    rol: new FormControl(),
    kayTarih: new FormControl(),
    duzTarih: new FormControl(),
  });
  constructor(public dataServis: DataService, public toast: MytoastService) {}

  ngOnInit() {
    this.UyeListele();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({});
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Üye Ekle';
    this.modal.show();
  }

  Duzenle(uye: Uye, el: HTMLElement) {
    this.frm.patchValue(uye);
    this.modalBaslik = 'Üye Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uye: Uye, el: HTMLElement) {
    this.secUye = uye;
    this.modalBaslik = 'Üye Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.dataServis.UyeListele().subscribe((d) => {
      this.uyeler = d;
    });
  }

  UyeEkleDuzenle() {
    var uye: Uye = this.frm.value;
    var tarih = new Date();
    if (!uye.id) {
      var filtre = this.uyeler.filter((s) => (s.mail == uye.mail));
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = 'Girilen Mail Adresi Kayıtlıdır';
        this.toast.ToastUygula(this.sonuc);
      } else {
        uye.kayTarih = tarih.getTime().toString();
        uye.duzTarih = tarih.getTime().toString();
        this.dataServis.UyeEkle(uye).subscribe((d) => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = 'Üye Eklendi';
          this.toast.ToastUygula(this.sonuc);
          this.UyeListele();
          this.modal.toggle();
        });
      }
    } else {
      uye.duzTarih = tarih.getTime().toString();
      this.dataServis.UyeDuzenle(uye).subscribe((d) => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Üye Düzenlendi';
        this.toast.ToastUygula(this.sonuc);
        this.UyeListele();
        this.modal.toggle();
      });
    }
  }
  UyeSil() {
    this.dataServis.UyeSil(this.secUye.id).subscribe((d) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Üye Silindi';
      this.toast.ToastUygula(this.sonuc);
      this.UyeListele();
      this.modal.toggle();
    });
  }
}
