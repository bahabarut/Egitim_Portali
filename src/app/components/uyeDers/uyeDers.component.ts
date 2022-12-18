import { Uye_Ders } from './../../models/Uye_Ders';
import { Uye } from './../../models/Uye';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import * as bootstrap from 'bootstrap';
import { Ders } from 'src/app/models/Ders';
import { Sonuc } from 'src/app/models/Sonuc';
import { Modal } from 'bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-uyeDers',
  templateUrl: './uyeDers.component.html',
  styleUrls: ['./uyeDers.component.scss'],
})
export class UyeDersComponent implements OnInit {
  uyeler!: Uye[];
  uyeId: number = 0;
  dersler!: Ders[];
  uyeDersler!: Uye_Ders[];
  modal!: Modal;
  modalBaslik: string = '';
  secUyeDers!: Uye_Ders;
  secUye: Uye = new Uye();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    lessonId: new FormControl(),
    userId: new FormControl(),
    kayTarih: new FormControl(),
  });
  constructor(
    public dataServis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.uyeId) {
        this.uyeId = p.uyeId;
        this.UyeGetirById();
      }
    });
    this.UyeListele();
    this.DersListele();
  }
  UyeSec(uyeId: number) {
    this.uyeId = uyeId;
    this.UyeGetirById();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({});
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Ders Ekle';
    this.modal.show();
  }

  Duzenle(uyeders: Uye_Ders, el: HTMLElement) {
    this.frm.patchValue(uyeders);
    this.modalBaslik = 'Ders Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(uyeders: Uye_Ders, el: HTMLElement) {
    this.secUyeDers = uyeders;
    this.modalBaslik = 'Ders Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  UyeListele() {
    this.dataServis.UyeListele().subscribe((d) => {
      this.uyeler = d;
    });
  }
  DersListele() {
    this.dataServis.DersListele().subscribe((d) => {
      this.dersler = d;
    });
  }
  UyeGetirById() {
    this.dataServis.UyeById(this.uyeId).subscribe((d) => {
      this.secUye = d;
      this.UyeDersListele();
    });
  }

  UyeDersListele() {
    this.dataServis.UyeDersByUyeId(this.uyeId).subscribe((d) => {
      this.uyeDersler = d;
      console.log(d)
    });
  }

  UyeDersEkleDuzenle() {
    var uyeders: Uye_Ders = this.frm.value;
    var tarih = new Date();
    if (!uyeders.id) {
      var filtre = this.uyeDersler.filter((s) => s.dersId == uyeders.dersId);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = 'Girilen Ders Adı Kayıtlıdır';
        this.toast.ToastUygula(this.sonuc);
        filtre.splice(0, 1);
      } else {
        uyeders.kayTarih = tarih.getTime().toString();
        this.dataServis.UyeDersEkle(uyeders).subscribe((d) => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = 'Ders Eklendi';
          this.toast.ToastUygula(this.sonuc);
          this.UyeDersListele();
          this.modal.toggle();
        });
      }
    } else {
      this.dataServis.UyeDersDuzenle(uyeders).subscribe((d) => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Ders Düzenlendi';
        this.toast.ToastUygula(this.sonuc);
        this.UyeDersListele();
        this.modal.toggle();
      });
    }
  }
  UyeDersSil() {
    this.dataServis.UyeDersSil(this.secUyeDers.id).subscribe((d) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Ders Silindi';
      this.toast.ToastUygula(this.sonuc);
      this.UyeDersListele();
      this.modal.toggle();
    });
  }
}
