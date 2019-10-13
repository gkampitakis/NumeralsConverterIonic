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
  loader: any;

  constructor(
    private modalCtrl: ModalController,
    private conversionService: ConversionService,
    private alertCtrl: AlertController,
    private toastController: ToastController,
    private loadCtrl: LoadingController
  ) {}

  async ngOnInit() {
    this.loader = await this.loadCtrl.create({
      message: 'Please wait ...',
      duration: 2000,
      translucent: true
    });
    try {
      this.values = await this.conversionService.retrieveAll(this.tab);
    } catch (error) {
      this.showErrorToast(JSON.stringify(error));
    }
  }

  closeModal() {
    this.modalCtrl.dismiss();
  }

  async segmentChanged(event) {
    const loading = await this.loadCtrl.create({
      message: 'Please wait ...',
      duration: 2000,
      translucent: true
    });
    const query = (this.tab = event.detail.value);
    this.loader.present();
    try {
      this.values = await this.conversionService.retrieveAll(query);
    } catch (error) {
      this.showErrorToast(JSON.stringify(error));
    } finally {
      this.loader.dismiss();
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
              this.loader.present();
              try {
                await this.conversionService.removeAll();
                this.values = [];
              } catch (error) {
                this.showErrorToast(JSON.stringify(error));
              } finally {
                this.loader.dismiss();
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
}
