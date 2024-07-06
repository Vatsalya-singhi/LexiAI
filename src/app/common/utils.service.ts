import { Injectable } from '@angular/core';
import { ToastController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController, private alertController: AlertController) { }

  public async presentToast(message: string, duration: number = 1500, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      icon: "alert-circle-outline",
    });
    return await toast.present();
  }


  public async presentAlert(header: string, subHeader: string, message: string, backdropDismiss: boolean = false, buttons: I_alertButton[] | string[]) {
    const alert = await this.alertController.create({
      header,
      subHeader,
      message,
      animated: true,
      backdropDismiss,
      buttons,
    });
    return await alert.present();
  }

}


interface I_alertButton {
  text: string,
  role: string,
  cssClass: 'primary' | 'secondary' | 'tertiary',
  handler: () => any
}
