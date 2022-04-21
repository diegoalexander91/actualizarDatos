import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(
    private toastCtrl: ToastController,
    private loadingCtr: LoadingController
  ) { }

  async presentToastMsg(msg, color) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color: color,
      duration: 2000
    });
    return toast.present();
  }

  async presentLoading(message, duration) {
    const loading = await this.loadingCtr.create({
      spinner: 'dots',
      cssClass: 'my-custom-class',
      message,
      duration
    });
     return await loading.present();
  }
}
