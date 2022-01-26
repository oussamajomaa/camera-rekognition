import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { CollectionComponent } from './collection/collection.component';
import { HistoriqueComponent } from './historique/historique.component';
import { PrestataireComponent } from './prestataire/prestataire.component';

const routes : Routes = [
  {
    path: "",
    children: [
      { path: "prestataire", component: PrestataireComponent },
      { path: "collection", component: CollectionComponent },
      { path: "detection", component: HistoriqueComponent }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RekognitionAdminRootingModule { }
