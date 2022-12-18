import { Uye_Ders } from './../models/Uye_Ders';
import { Konu } from './../models/Konu';
import { Uye } from './../models/Uye';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { Ders } from '../models/Ders';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public apiUrl = 'http://localhost:3000/';
  public aktifUye: Uye = new Uye();
  constructor(public http: HttpClient) {}

  /*Uye işlemleri start*/

  OturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(
      this.apiUrl + 'users?mail=' + mail + '&parola=' + parola
    );
  }

  OturumKontrol() {
    if (localStorage.getItem('adSoyad')) {
      this.AktifUyeBilgi();
      return true;
    } else {
      return false;
    }
  }

  AktifUyeBilgi() {
    if (localStorage.getItem('adSoyad')) {
      this.aktifUye.adSoyad = localStorage.getItem('adSoyad') || '';
      var rol = localStorage.getItem('rol') || '0';
      this.aktifUye.rol = rol;
    }
  }

  /*Uye işlemleri end*/

  /*Uye Servis Start*/
  UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + 'users');
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + 'users/' + id);
  }
  UyeListeleByRol(rol: string) {
    //üyeleri rolüne göre getir ogretmenler adminler ogrenciler
    return this.http.get<Uye[]>(this.apiUrl + 'users/' + rol);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + 'users/', uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + 'users/' + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + 'users/' + id);
  }
  /*Uye Servis End*/

  /*Kategori Servis Start*/
  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + 'categories');
  }
  KategoriById(id: number) {
    return this.http.get<Kategori>(this.apiUrl + 'categories/' + id);
  }
  KategoriEkle(kategori: Kategori) {
    return this.http.post(this.apiUrl + 'categories/', kategori);
  }
  KategoriDuzenle(kategori: Kategori) {
    return this.http.put(this.apiUrl + 'categories/' + kategori.id, kategori);
  }
  KategoriSil(id: number) {
    return this.http.delete(this.apiUrl + 'categories/' + id);
  }
  /*Kategori Servis End*/

  /*Ders Servis Start*/
  DersListele() {
    return this.http.get<Ders[]>(this.apiUrl + 'lessons');
  }
  DersById(id: number) {
    return this.http.get<Ders>(this.apiUrl + 'lessons/' + id);
  }
  DersByKategoriId(kategoriId: number) {
    return this.http.get<Ders[]>(
      this.apiUrl  +'categories/' + kategoriId + '/lessons'
    );
  }
  // DersByUyeId(uyeId: number) {                                    //üyenin id sine göre dersleri listele(üyenin aldığı dersler)
  //   return this.http.get<Ders[]>(this.apiUrl  +'users/' + uyeId + '/lessons');
  // }
  DersEkle(ders: Ders) {
    return this.http.post(this.apiUrl + 'lessons/', ders);
  }
  DersDuzenle(ders: Ders) {
    return this.http.put(this.apiUrl + 'lessons/' + ders.id, ders);
  }
  DersSil(id: number) {
    return this.http.delete(this.apiUrl + 'lessons/' + id);
  }
  /*Ders Servis End*/

  /*Konu Servis Start*/
  KonuListele() {
    return this.http.get<Konu[]>(this.apiUrl + 'subjects');
  }
  KonuById(id: number) {
    return this.http.get<Konu>(this.apiUrl + 'subjects/' + id);
  }
  KonuByDersId(dersId: number) {
    //Dersin id sine göre konuları getir (dersin konuları)
    return this.http.get<Konu[]>(
      this.apiUrl + 'lessons/' + dersId + '/subjects'
    );
  }
  KonuEkle(konu: Konu) {
    return this.http.post(this.apiUrl + 'subjects/', konu);
  }
  KonuDuzenle(konu: Konu) {
    return this.http.put(this.apiUrl + 'subjects/' + konu.id, konu);
  }
  KonuSil(id: number) {
    return this.http.delete(this.apiUrl + 'subjects/' + id);
  }
  /*Konu Servis End*/

  /*Uye_Ders Servis Start*/
  UyeDersListele() {
    return this.http.get<Uye_Ders[]>(this.apiUrl + 'users_lessons');
  }
  UyeDersById(id: number) {
    return this.http.get<Uye_Ders>(this.apiUrl + 'users_lessons/' + id);
  }
  UyeDersByUyeId(uyeid: number) {
    return this.http.get<Uye_Ders[]>(this.apiUrl + 'users/' + uyeid + '/users_lessons');
  }
  UyeDersEkle(uyeders: Uye_Ders) {
    return this.http.post(this.apiUrl + 'users_lessons/', uyeders);
  }
  UyeDersDuzenle(ders: Uye_Ders) {
    return this.http.put(this.apiUrl + 'users_lessons/' + ders.id, ders);
  }
  UyeDersSil(id: number) {
    return this.http.delete(this.apiUrl + 'users_lessons/' + id);
  }
  /*Uye_Ders Servis End*/
}
