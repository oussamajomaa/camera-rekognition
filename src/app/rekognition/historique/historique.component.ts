import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
	selector: 'app-historique',
	templateUrl: './historique.component.html',
	styleUrls: ['./historique.component.css'],
})
export class HistoriqueComponent implements OnInit {
	prestataires:any;

	allData: any ;
	prestataireID: string;
	body = {}
	selectedDate = new Date().toISOString().slice(0, 10);
	dt = Date.now();

	processorStatus:any = "";

	constructor(private router: Router, private http: HttpClient) {
		this.http.get(`${environment.url}/create-collection`).subscribe((res:{collection:{CollectionIds:[]}}) => {
			console.log('Nom de la collection: ',res.collection.CollectionIds)
		})
	}

	 getPrestataires() {
		this.http.get(`${environment.url}/prestataires`).subscribe((data:{items:{}}) => { 
			this.allData = data.items;
				this.prestataires = this.allData
					.map((item) => {
						item.Date = new Date(item.Date*1000);
						return item;
					})
					.filter(
						(prestataire) =>
							prestataire.Date.toISOString().slice(0, 10) === this.selectedDate
					)
					.sort((a, b) => {
						if (a.Date < b.Date) return -1;
						if (a.Date > b.Date) return 1;
						return 0;
					});
			
		});
		
	 }

	// call prestataire path and send 2 parameters
	navigateToPrestataire(id: string) {
		this.router.navigate(['prestataire'], {
			state: {
				prestataireID: id,
				dateSelected: this.selectedDate,
			},
		});
	}

	updateDate() {
		this.prestataires = this.allData
			.filter(
				(prestataire) =>
					prestataire.Date.toISOString().slice(0, 10) === this.selectedDate
			)
			.sort((a, b) => {
				if (a.Date < b.Date) return -1; //sort data by date
				if (a.Date > b.Date) return 1;
				return 0;
			});
	}

	ngOnInit() {
		this.getPrestataires();
		
	}
}
