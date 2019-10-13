import { Component, OnInit } from '@angular/core';
import { ConversionService } from '../conversion.service';
import {
  ToastController,
  ModalController,
  LoadingController
} from '@ionic/angular';
import { ConvertedValues } from './components/converted-values/converted-values';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  roman: string;
  arabic: number;
  submitted: boolean = false;
  loader: any;

  constructor(
    private conversionService: ConversionService,
    public toastController: ToastController,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loader = await this.loadCtrl.create({
      message: 'Please wait ...',
      duration: 2000,
      translucent: true
    });
  }

  clearBoth() {
    this.roman = null;
    this.arabic = null;
    this.submitted = false;
  }

  async calculate() {
    this.submitted = true;
    if (this.roman != null) {
      this.loader.present();
      try {
        this.arabic = await this.conversionService.getArabic(this.roman);
      } catch (err) {
        this.showErrorToast(JSON.stringify(err));
        this.submitted = false;
      } finally {
        this.loader.dismiss();
      }
    } else if (this.arabic != null) {
      this.loader.present();
      try {
        this.roman = await this.conversionService.getRoman(this.arabic);
      } catch (err) {
        this.showErrorToast(JSON.stringify(err));
        this.submitted = false;
      } finally {
        this.loader.dismiss();
      }
    }
  }

  async showErrorToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
      color: 'danger'
    });
    toast.present();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: ConvertedValues
    });

    return await modal.present();
  }
}
