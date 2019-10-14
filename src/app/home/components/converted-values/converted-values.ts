import { Component, OnInit } from '@angular/core';
import {
  ModalController,
  AlertController,
  ToastController,
  LoadingController
} from '@ionic/angular';
import { ConversionService } from 'src/app/conversion.service';

@Component({
  selector: 'app-converted-values',
  templateUrl: './converted-values.html',
  styleUrls: ['./converted-values.scss']
})
export class ConvertedValues implements OnInit {
  tab: string = 'arabic';
  values: Array<any> = [];

  constructor(
    private modalCtrl: ModalController,
    private conversionService: ConversionService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private loadCtrl: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.createLoading();
    loading.present();
    try {
      this.values = await this.conversionService.retrieveAll(this.tab);
    } catch (error) {
      this.showErrorToast(JSON.stringify(error));
    } finally {
      loading.dismiss();
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async segmentChanged(event) {
    this.values = [];
    const loading = await this.createLoading();
    const query = (this.tab = event.detail.value);

    loading.present();
    try {
      this.values = await this.conversionService.retrieveAll(query);
    } catch (error) {
      this.showErrorToast(JSON.stringify(error));
    } finally {
      loading.dismiss();
    }
  }

  deleteAll() {
    this.presentAlertConfirm();
  }

  presentAlertConfirm() {
    return this.alertCtrl
      .create({
        header: 'Delete All',
        message: 'All data are going to be <strong>removed</strong>!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'alertButton',
            handler: () => {}
          },
          {
            text: 'Okay',
            cssClass: 'alertButton',
            handler: async () => {
              const loading = await this.createLoading();
              loading.present();
              try {
                await this.conversionService.removeAll();
                this.values = [];
              } catch (error) {
                this.showErrorToast(JSON.stringify(error));
              } finally {
                loading.dismiss();
              }
            }
          }
        ]
      })
      .then(a => a.present());
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

  private async createLoading() {
    return this.loadCtrl.create({
      message: 'Please wait ...',
      translucent: true
    });
  }
}
