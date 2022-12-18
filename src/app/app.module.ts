import { UyeDersComponent } from './components/uyeDers/uyeDers.component';
import { KonuComponent } from './components/konu/konu.component';
import { AuthGuard } from './services/auth.guard';
import { MytoastService } from './services/mytoast.service';
import { DataService } from './services/data.service';
import { LoginComponent } from './components/login/login.component';
import { DersComponent } from './components/ders/ders.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UyeComponent } from './components/uye/uye.component';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UyeComponent,
    KategoriComponent,
    DersComponent,
    LoginComponent,
    KonuComponent,
    UyeDersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotToastModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DataService, MytoastService,AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
