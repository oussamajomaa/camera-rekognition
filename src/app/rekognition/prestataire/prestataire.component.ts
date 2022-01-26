import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
	selector: 'app-prestataire',
	templateUrl: './prestataire.component.html',
	styleUrls: ['./prestataire.component.css'],
})
export class PrestataireComponent implements OnInit {
	prestataires = [];

	allData: any = [];

	PartnerID: string;

	selectedDate = new Date().toISOString().slice(0, 10);


	constructor(private http: HttpClient, private router: Router) {
		// Récupérer l'id du prestataire et la date sélectionnée
		this.PartnerID = this.router.getCurrentNavigation().extras.state.prestataireID;
		this.selectedDate = this.router.getCurrentNavigation().extras.state.dateSelected;
	}

	// Get data from DynamoDB via an API Gateway on aws
	getPrestataires() {
		this.http.get(`${environment.url}/prestataires`).subscribe((data:{items:{}}) => {
			this.allData = data.items;
			this.prestataires = this.allData
			.map((item) => {
				item.Date = new Date(item.Date*1000)
				return item
			})
			.filter((prestataire) =>
				prestataire.Date.toISOString().slice(0, 10) === this.selectedDate &&
				prestataire.PartnerID === this.PartnerID
			)
			.sort((a, b) => {
				if (a.Date < b.Date) return -1;
				if (a.Date > b.Date) return 1;
				return 0;
			});
		});
	}

	ngOnInit(): void {
		this.getPrestataires();
	}

	// mise à jour de la date choisie
	newDate() {
		this.prestataires = this.allData.filter((prestataire) =>
			prestataire.Date.toISOString().slice(0, 10) === this.selectedDate &&
			prestataire.PartnerID === this.PartnerID
		).sort((a, b) => {
			if (a.Date < b.Date) return -1; //sort data by date
			if (a.Date > b.Date) return 1;
			return 0;
		})
	}
}
