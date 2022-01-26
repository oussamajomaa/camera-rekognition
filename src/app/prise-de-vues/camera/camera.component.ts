import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-camera',
	templateUrl: './camera.component.html',
	styleUrls: ['./camera.component.css'],
})
export class CameraComponent implements OnInit {
	@Output()

	width=window.innerWidth
	height=this.width*.75
	message:string

	prestataireID: string = '';

	isSaved: boolean = false;

	isTaken: boolean = false;

	prestataires = [];

	id: any;

	imageUrl: any;

	buttonDisabled: boolean = false;

	index = 0;

	base64: string = '';

	text: string = 'Prendre une photo';

	modified: boolean = false;

	pictureTaken = new EventEmitter<WebcamImage>();

	// toggle webcam on/off
	showWebcam = true;

	allowCameraSwitch = true;
	multipleWebcamsAvailable = false;
	deviceId: string;

	webcamImage: WebcamImage = null;

	errors: WebcamInitError[] = [];

	// webcam snapshot trigger
	trigger: Subject<void> = new Subject<void>();
	// switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
	nextWebcam: Subject<boolean | string> = new Subject<boolean | string>();

	constructor(private http: HttpClient, private router:Router, private toastr: ToastrService) { 
		this.width = window.innerWidth*.5
		this.height=this.width*.75
		window.onresize = () => {
			this.width = window.innerWidth*.7
			this.height=this.width*.75
		}
	}

	ngOnInit(): void {
		WebcamUtil.getAvailableVideoInputs().then(
			(mediaDevices: MediaDeviceInfo[]) => {
				this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
			}
		);
	}

	triggerSnapshot(): void {
		this.trigger.next();
		this.text = 'Modifier la photo';
		this.buttonDisabled = false;
		this.modified = true;
		console.log(this.prestataires);
		this.isTaken = true
		this.width = window.innerWidth*.5
		this.height=this.width*.75
	}

	toggleWebcam(): void {
		this.showWebcam = !this.showWebcam;
	}

	handleInitError(error: WebcamInitError): void {
		this.errors.push(error);
	}

	showNextWebcam(directionOrDeviceId: boolean | string): void {
		this.nextWebcam.next(directionOrDeviceId);
	}

	cameraWasSwitched(deviceId: string): void {
		console.log('active device: ' + deviceId);
		this.deviceId = deviceId;
	}

	public get triggerObservable(): Observable<void> {
		return this.trigger.asObservable();
	}

	handleImage(webcamImage: WebcamImage): void {
		this.webcamImage = webcamImage;
		this.base64 = this.webcamImage.imageAsDataUrl;
	}

	dataURItoBlob(base64: any) {
		let binary = atob(base64.split(',')[1]);
		let array = [];
		for (let i = 0; i < binary.length; i++) {
			array.push(binary.charCodeAt(i));
		}
		return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
	}

	saveImage() {
		this.index += 1;

		// change button's text
		this.text = 'Prendre une photo';


		this.id = Date.now();
		// concatenate user id and the date with image type
		// let fileName = localStorage.getItem("id") + '_' + this.id + '.jpeg';
		let fileName = localStorage.getItem("id") + '.jpeg';
		fileName = fileName.replace('|','_')


		// convert image into blob object
		let photo = this.dataURItoBlob(this.base64);

		// send http request post which call an api gatway on aws

		console.log({ name: fileName });

		console.log(photo);
		
		
		this.http.post(`${environment.url}/upload`, photo, { params: { name: fileName } })
		.subscribe(
			res => {
				console.log(res)
			},
			err => console.error("message", err.error)
			);
		this.isSaved = true;
		this.isTaken = false
		this.width = window.innerWidth*.5
		this.height=this.width*.75

		this.toastr.success('Photo envoyée avec succès !')
	}
	newPhoto(){
		this.buttonDisabled = !this.buttonDisabled;
		this.modified = false;
		this.isSaved = false;
	}

	nonNewPhoto(){
		this.router.navigate(['mon-historique'])
	}

	changePhoto(){
		// this.isTaken = true;
		this.isTaken = false
		console.log(this.isTaken)
		this.width = window.innerWidth*.5
		this.height=this.width*.75
	}
}