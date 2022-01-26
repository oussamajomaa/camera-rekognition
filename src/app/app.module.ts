import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CameraComponent } from './prise-de-vues/camera/camera.component';

import {FormsModule} from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';
import { NavbarComponent } from './navbar/navbar.component';
import { InstructionsComponent } from './prise-de-vues/instructions/instructions.component';
import { ConditionsComponent } from './prise-de-vues/conditions/conditions.component';
import { HttpClientModule } from '@angular/common/http';
import { HistoriqueComponent } from './rekognition/historique/historique.component';
import { PrestataireComponent } from './rekognition/prestataire/prestataire.component';
import { PriseDeVuesModule } from './prise-de-vues/prise-de-vues.module';
import { RekognitionModule } from './rekognition/rekognition.module';
import { MonHistoriqueComponent } from './prise-de-vues/mon-historique/mon-historique.component';
import { CollectionComponent } from './rekognition/collection/collection.component';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from 'ngx-toastr';




@NgModule({
  declarations: [
    AppComponent,
    CameraComponent,
    NavbarComponent,
    InstructionsComponent,
    ConditionsComponent,
    HistoriqueComponent,
    PrestataireComponent,
    MonHistoriqueComponent,
    CollectionComponent  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    WebcamModule,
    HttpClientModule,
    PriseDeVuesModule,
    RekognitionModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        progressBar: true,
        positionClass: 'toast-bottom-center',
        tapToDismiss: true
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
