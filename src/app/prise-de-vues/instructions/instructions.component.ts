import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  instructions = [
    {
        text: "1- Votre distance par rapport à la caméra doit etre à 40 cm"
    },
    {
        text: "2- Votre visage doit etre dans le cadre illustrer sur l’écran"
    },
    {
        text: "3- votre posture doit etre conforme aux postures dans la figure en dessous"
    },
    {
        text: "4- Cinq photos minimum en respectant les postures au dessus doit etre prise (une session de plus de 5 photos sera appreciée)"
    },
    {
        text: "5- essayez au maximum d’avoir une éclairage uniforme sur les deux côtés du visage"
    },
    {
        text: "6- Vous aurez la possibilite de ch......"
    }
    ]
  constructor() {}

  ngOnInit(): void {

  }

}
