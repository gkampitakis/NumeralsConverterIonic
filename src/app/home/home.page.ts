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
export class HomePage {
  roman: string = '';
  arabic: number = null;
  submitted: boolean = false;

  constructor(
    private conversionService: ConversionService,
    public toastController: ToastController,
    private modalCtrl: ModalController,
    private loadCtrl: LoadingController
  ) {}

  clearBoth() {
    this.roman = '';
    this.arabic = null;
    this.submitted = false;
  }

  async calculate() {
    const loading = await this.createLoading();
    this.submitted = true;

    if (this.roman !== '' && this.arabic == null) {
      loading.present();
      try {
        this.arabic = await this.conversionService.getArabic(this.roman);
      } catch (err) {
        this.showErrorToast(JSON.stringify(err));
        this.submitted = false;
      } finally {
        loading.dismiss();
      }
    }

    if (this.arabic != null && this.roman === '') {
      loading.present();
      try {
        this.roman = await this.conversionService.getRoman(this.arabic);
      } catch (err) {
        this.showErrorToast(JSON.stringify(err));
        this.submitted = false;
      } finally {
        loading.dismiss();
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

  private async createLoading() {
    return this.loadCtrl.create({
      message: 'Please wait ...',
      translucent: true
    });
  }
}
