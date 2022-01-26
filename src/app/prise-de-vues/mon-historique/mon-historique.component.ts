import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-mon-historique',
	templateUrl: './mon-historique.component.html',
	styleUrls: ['./mon-historique.component.css'],
})
export class MonHistoriqueComponent implements OnInit {
	prestataires = [];

	allData: any = [];

	prestataireID: string;

	selectedDate = new Date().toISOString().slice(0, 10);

	constructor(private router: Router, private http: HttpClient) {}

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
				prestataire.PartnerID === localStorage.getItem('id')
			)
			.sort((a, b) => {
				if (a.Date < b.Date) return -1;
				if (a.Date > b.Date) return 1;
				return 0;
			});
		});
	}

	navigateToPrestataire(id) {
		this.router.navigate(['prestataire']);
	}

	updateDate() {
		this.prestataires = this.allData.filter((prestataire) =>
			prestataire.Date.toISOString().slice(0, 10) === this.selectedDate &&
			prestataire.PartnerID === localStorage.getItem('id')
		).sort((a, b) => {
			if (a.Date < b.Date) return -1;
			if (a.Date > b.Date) return 1;
			return 0;
		});
	}

	ngOnInit() {
		this.getPrestataires();
	}
}
