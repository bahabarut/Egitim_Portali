import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  kategoriler!: Kategori[];
  constructor(public dataServis: DataService) {}

  ngOnInit() {
    this.KategoriListele();
  }

  KategoriListele() {
    this.dataServis.KategoriListele().subscribe((d) => {
      this.kategoriler = d;
    });
  }
}
