import { Component } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(public dataServis:DataService){}
  OturumKapat() {
    localStorage.clear();
    location.href = '/';
  }
}
