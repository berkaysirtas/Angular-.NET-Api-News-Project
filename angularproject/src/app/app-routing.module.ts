import { UyehaberComponent } from './components/uyehaber/uyehaber.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HaberComponent } from './components/haber/haber.component';
import { AuthGuard } from './services/AuthGuard';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminHaberComponent } from './components/admin/admin-haber/admin-haber.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
{
  path:'',
  component: HomeComponent
},
{
  path:'login',
  component: LoginComponent
},
{
  path:'haber/:haberId',
  component: HaberComponent
},
{
  path:'kategori/:katId',
  component: KategoriComponent
},
{
  path:'uyehaber/:uyeId',
  component: UyehaberComponent
},
{
  path:'admin',
  component: AdminComponent,
  canActivate: [AuthGuard],
  data: {
    yetkiler: ['Admin'],
    gerigit: ['/login']
  }
},
{
  path:'admin/kategori',
  component: AdminKategoriComponent,
  canActivate: [AuthGuard],
  data: {
    yetkiler: ['Admin'],
    gerigit: ['/login']
  }
},
{
  path:'admin/uye',
  component: AdminUyeComponent,
  canActivate: [AuthGuard],
  data: {
    yetkiler: ['Admin'],
    gerigit: ['/login']
  }
},
{
  path:'admin/haber',
  component: AdminHaberComponent
},
{
  path:'admin/haber/:katId',
  component: AdminHaberComponent
},
{
  path:'admin/uye',
  component: AdminUyeComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
