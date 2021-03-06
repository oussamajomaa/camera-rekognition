
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-conditions',
  templateUrl: './conditions.component.html',
  styleUrls: ['./conditions.component.css']
})
export class ConditionsComponent implements OnInit {
  conditions = [
	{
	  "title": "LE FONCTIONNEMENT DE LA RECONNAISSANCE FACIALE",
	  "descr": [
		{
		  "text": "Les systèmes de reconnaissance faciale saisissent une image entrante provenant d’une caméra,de manière bidimensionnelle ou tridimensionnelle, conformément aux caractéristiques du dispositif. Ceux-ci comparent les informations pertinentes du signal de l’image entrante en temps réel, provenant d’une photo ou vidéo dans une base de données, ce qui est beaucoup plus fiable et sûr que les informations obtenues à partir d’une image statique. Cette procédure de reconnaissance faciale biométrique requiert une connexion à Internet, la base de données ne pouvant pas être située dans le dispositif de saisie puisqu’elle est hébergée dans des serveurs."
		},
		{
		  "text": "Lors de cette comparaison entre visages, il analyse mathématiquement l’image entrante sans aucune marge d’erreur et vérifie que les données biométriques correspondent à la personne qui doit faire usage du service ou sollicite l’accès à une application, un système, voire un immeuble."
		},
		{
		  "text": "Grâce à l’utilisation de l’intelligence artificielle (IA) et des technologies d’apprentissage automatique, les systèmes de reconnaissance faciale peuvent fonctionner conformément aux standards les plus élevés de sécurité et fiabilité. De manière similaire, grâce à l’intégration de ces algorithmes et techniques informatiques, le processus peut être mené à bien en temps réel."
		}
	  ]
	},
	{
	  "title": "CAS D’USAGE EN MATIÈRE DE RECONNAISSANCE FACIALE",
	  "descr": [
		{
		  "text": "Les usages de la reconnaissance faciale se focalisent sur la vérification ou l’authentification. Cette technologie est utilisée, par exemple, dans des situations telles que :",
			"ul": [
				{
				  "li": "Accès aux applications portables sans mot de passe."
				},
				{
				  "li": "Accès à des services en ligne préalablement souscrits(connexion à des plateformes en ligne, par exemple)."
				},
				{
				  "li": "Accès aux immeubles (bureau, évènements, installations de toute sorte …)."
				},
				{
				  "li": "Méthode de règlement, à la fois dans des magasins physiques et en ligne."
				},
				{
				  "li": "Accès à un dispositif verrouillé."
				}
			]
		},
		{
		  "text": "Grâce à l’utilisation de l’intelligence artificielle (IA) et des technologies d’apprentissage automatique, les systèmes de reconnaissance faciale peuvent fonctionner conformément aux standards les plus élevés de sécurité et fiabilité. De manière similaire, grâce à l’intégration de ces algorithmes et techniques informatiques, le processus peut être mené à bien en temps réel."
		}
	  ]
	}
  ]
  constructor() {}

  ngOnInit(): void {
  }

}
