import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { takeWhile } from 'rxjs';
import { ServerEndpointsService } from 'src/app/common/server-endpoints.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.page.html',
  styleUrls: ['./courses.page.scss'],
})
export class CoursesPage implements OnInit, OnDestroy {

  public alive: boolean = true;
  public languageList: { code: string, name: string }[] = [] as any;

  constructor(
    private toastController: ToastController,
    public server: ServerEndpointsService,
    private router: Router) { }

  public ngOnInit(): void {
    this.server.getLanguages()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data: { languages: { code: string, name: string }[] }) => {
        this.languageList = data['languages'];
      });

  }

  public ngOnDestroy(): void {
    this.alive = false;
  }


  public async openCourse({ name, code }: { name: string, code: string }) {
    if (name.toLowerCase() != "english") {
      await this.presentToast(`The ${name} language module is currently unavailable.`);
      return;
    }
    this.router.navigate([`/level`, { name: name, code: code }]);
  }

  public async presentToast(message: string, duration: number = 1500, position: 'top' | 'middle' | 'bottom' = 'bottom') {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: position,
      icon: "alert-circle-outline",
    });
    await toast.present();
  }

  public getIcon(code: string) {
    return `../../../assets/${code}.svg`;
  }

}
