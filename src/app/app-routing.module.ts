import { AuthGuard } from './services/auth.guard';
import { UyeDersComponent } from './components/uyeDers/uyeDers.component';
import { KonuComponent } from './components/konu/konu.component';
import { LoginComponent } from './components/login/login.component';
import { DersComponent } from './components/ders/ders.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UyeComponent } from './components/uye/uye.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'uyeler', component: UyeComponent,canActivate:[AuthGuard] },
  { path: 'kategoriler', component: KategoriComponent,canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'dersler', component: DersComponent,canActivate:[AuthGuard] },
  { path: 'dersler/:kategoriId', component: DersComponent,canActivate:[AuthGuard] },
  { path: 'konular', component: KonuComponent,canActivate:[AuthGuard] },
  { path: 'konular/:dersId', component: KonuComponent,canActivate:[AuthGuard] },
  { path: 'uyedersler', component: UyeDersComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
