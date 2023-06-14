import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { UyehaberComponent } from './components/uyehaber/uyehaber.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { HaberComponent } from './components/haber/haber.component';
import { AuthGuard } from './services/AuthGuard';
import { AuthInterceptor } from './services/AuthInterceptor';
import { ApiService } from 'src/app/services/api.service';
import { HaberDialogComponent } from './components/dialogs/haber-dialog/haber-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { AdminUyeComponent } from './components/admin/admin-uye/admin-uye.component';
import { AdminHaberComponent } from './components/admin/admin-haber/admin-haber.component';
import { AdminKategoriComponent } from './components/admin/admin-kategori/admin-kategori.component';
import { AdminComponent } from './components/admin/admin/admin.component';
import { LoginComponent } from './components/login/login.component';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SafeHTMLPipe } from './pipes/safeHtml-pipe.pipe';
import { JoditAngularModule } from 'jodit-angular';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    LoginComponent,
    HaberComponent,
    KategoriComponent,
    UyehaberComponent,

    // Admin
    AdminComponent,
    AdminKategoriComponent,
    AdminHaberComponent,
    AdminUyeComponent,


    //Dialogs
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    UyeDialogComponent,
    HaberDialogComponent,
    SafeHTMLPipe


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    JoditAngularModule
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    KategoriDialogComponent,
    HaberDialogComponent,
    UyeDialogComponent

  ],
  providers: [MyAlertService, ApiService, SafeHTMLPipe, AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
