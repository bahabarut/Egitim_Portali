import { Kategori } from './../../models/Kategori';
import { Ders } from './../../models/Ders';
import { Component, OnInit } from '@angular/core';
import { Modal } from 'bootstrap';
import { Sonuc } from 'src/app/models/Sonuc';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ders',
  templateUrl: './ders.component.html',
  styleUrls: ['./ders.component.scss'],
})
export class DersComponent implements OnInit {
  kategoriler!: Kategori[];
  kategoriId: number=0;
  dersler!: Ders[];
  modal!: Modal;
  modalBaslik: string = '';
  secDers!: Ders;
  secKategori: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    dersKodu: new FormControl(),
    dersAdi: new FormControl(),
    dersKredisi: new FormControl(),
    dersSaati: new FormControl(),
    categoryId: new FormControl(),
    kayTarih: new FormControl(),
    duzTarih: new FormControl(),
  });
  constructor(
    public dataServis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((p: any) => {
      if (p.kategoriId) {
        this.kategoriId = p.kategoriId;
        this.KategoriGetirById();
      }
    });
    this.KategoriListele();
  }
  KategoriSec(kategoriId: number) {
    this.kategoriId = kategoriId;
    this.KategoriGetirById();
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({});
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = 'Ders Ekle';
    this.modal.show();
  }

  Duzenle(ders: Ders, el: HTMLElement) {
    this.frm.patchValue(ders);
    this.modalBaslik = 'Ders Düzenle';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ders: Ders, el: HTMLElement) {
    this.secDers = ders;
    this.modalBaslik = 'Ders Sil';
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  KategoriListele() {
    this.dataServis.KategoriListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }
  KategoriGetirById() {
    this.dataServis.KategoriById(this.kategoriId).subscribe((d) => {
      this.secKategori = d;
      this.DersListele();
    });
  }

  DersListele() {
    this.dataServis.DersByKategoriId(this.kategoriId).subscribe((d) => {
      this.dersler = d;
    });
  }

  DersEkleDuzenle() {
    var ders: Ders = this.frm.value;
    var tarih = new Date();
    if (!ders.id) {
      var filtre = this.dersler.filter((s) => s.dersAdi == ders.dersAdi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = 'Girilen Ders Adı Kayıtlıdır';
        this.toast.ToastUygula(this.sonuc);
      } else {
        ders.kayTarih = tarih.getTime().toString();
        ders.duzTarih = tarih.getTime().toString();
        this.dataServis.DersEkle(ders).subscribe((d) => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = 'Ders Eklendi';
          this.toast.ToastUygula(this.sonuc);
          this.DersListele();
          this.modal.toggle();
        });
      }
    } else {
      ders.duzTarih = tarih.getTime().toString();
      this.dataServis.DersDuzenle(ders).subscribe((d) => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = 'Ders Düzenlendi';
        this.toast.ToastUygula(this.sonuc);
        this.DersListele();
        this.modal.toggle();
      });
    }
  }
  DersSil() {
    this.dataServis.DersSil(this.secDers.id).subscribe((d) => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = 'Ders Silindi';
      this.toast.ToastUygula(this.sonuc);
      this.DersListele();
      this.modal.toggle();
    });
  }
}
