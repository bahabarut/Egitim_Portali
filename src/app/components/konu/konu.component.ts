import { Konu } from './../../models/Konu';
import { Ders } from './../../models/Ders';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-konu',
  templateUrl: './konu.component.html',
  styleUrls: ['./konu.component.scss']
})
export class KonuComponent implements OnInit {
  dersler!: Ders[];
  dersId: number=0;
  konular!: Konu[];
  modal!: Modal;
  modalBaslik: string = '';
  secKonu!: Konu;
  secDers: Ders = new Ders();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    konuAdi: new FormControl(),
    lessonId: new FormControl(),

  });
  constructor(
    public dataServis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.kategoriId) {
        this.dersId = p.dersId;
        this.DersGetirById();
      }
    });
    this.DersListele();
  }
  DersSec(dersId: number) {
    this.dersId = dersId;
    this.DersGetirById();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({});
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Konu Ekle';
    this.modal.show();
  }

  Duzenle(konu: Konu, el: HTMLElement) {
    this.frm.patchValue(konu);
    this.modalBaslik = 'Konu Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(konu: Konu, el: HTMLElement) {
    this.secKonu = konu;
    this.modalBaslik = 'Konu Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  DersListele() {
    this.dataServis.DersListele().subscribe((d) => {
      this.dersler = d;
    });
  }
  DersGetirById() {
    this.dataServis.DersById(this.dersId).subscribe((d) => {
      this.secDers = d;
      this.KonuListele();
    });
  }

  KonuListele() {
    this.dataServis.KonuByDersId(this.dersId).subscribe((d) => {
      this.konular = d;
    });
  }

  KonuEkleDuzenle() {
    var konu: Konu = this.frm.value;
    var tarih = new Date();
    if (!konu.id) {
      var filtre = this.konular.filter((s) => s.konuAdi == konu.konuAdi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = 'Girilen Konu Adı Kayıtlıdır';
        this.toast.ToastUygula(this.sonuc);
      } else {
        this.dataServis.KonuEkle(konu).subscribe((d) => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = 'Konu Eklendi';
          this.toast.ToastUygula(this.sonuc);
          this.KonuListele();
          this.modal.toggle();
        });
      }
    } else {
      this.dataServis.KonuDuzenle(konu).subscribe((d) => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Konu Düzenlendi';
        this.toast.ToastUygula(this.sonuc);
        this.KonuListele();
        this.modal.toggle();
      });
    }
  }
  KonuSil() {
    this.dataServis.KonuSil(this.secKonu.id).subscribe((d) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Konu Silindi';
      this.toast.ToastUygula(this.sonuc);
      this.KonuListele();
      this.modal.toggle();
    });
  }
}
