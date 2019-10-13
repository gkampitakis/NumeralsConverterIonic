import { Component } from '@angular/core';
import { ConversionServiceService } from '../conversion-service.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  roman: string;
  arabic: number;
  submitted: boolean = false;
  errorMessage: string = '';
  //FIXME: name of service
  constructor(
    private conversionService: ConversionServiceService,
    public toastController: ToastController
  ) {}

  clearBoth() {
    this.roman = null;
    this.arabic = null;
    this.submitted = false;
  }

  async calculate() {
    this.submitted = true;
    if (this.roman != null) {
      try {
        this.arabic = await this.conversionService.getArabic(this.roman);
      } catch (err) {
        console.error(err); //FIXME:
        // this.errorMessage = JSON.stringify(err);
        this.showErrorToast(JSON.stringify(err));
        this.submitted = false;
      }
    } else if (this.arabic != null) {
      try {
        this.roman = await this.conversionService.getRoman(this.arabic);
      } catch (err) {
        console.error(err); //FIXME:
        this.showErrorToast(JSON.stringify(err));
        this.submitted = false;
      }
    }
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }
}
