import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(private toastController: ToastController,) { }

  public async presentToast(message: string, duration: number = 1500, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      icon: "alert-circle-outline",
    });
    return await toast.present();
  }

}
