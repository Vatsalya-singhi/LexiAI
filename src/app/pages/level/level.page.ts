import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { catchError, finalize, of, switchMap, takeWhile } from 'rxjs';
import { ServerEndpointsService } from 'src/app/common/server-endpoints.service';
import { UtilsService } from 'src/app/common/utils.service';

@Component({
  selector: 'app-level',
  templateUrl: './level.page.html',
  styleUrls: ['./level.page.scss'],
})
export class LevelPage implements OnInit, OnDestroy {

  public name: string = "";
  public code: string = "";
  public alive: boolean = true;
  public errorText: string = "No Content Available";
  public loading: boolean = false;

  public levelData: { id: number, languageCode: string, title: string }[] = [];
  public currentLevel: number = 0;
  public stepList: {
    "id": number,
    "title": string,
    "steps": {
      "id": number,
      "title": string,
      "slideshowId": number,
    }[]
  } = null as any;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public server: ServerEndpointsService,
    public utils: UtilsService) { }

  public ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(takeWhile(() => this.alive),
        switchMap((queryParams: ParamMap) => {
          this.name = queryParams.get('name') ?? "";
          this.code = queryParams.get('code') ?? "";
          if (!this.name || !this.code) {
            this.router.navigate([`/courses`]);
            return of({});
          }
          return this.server.getLevels();
        }))
      .subscribe((data: any) => {
        this.levelData = data['levels'];
      });
  }

  public ngOnDestroy(): void {
    this.alive = false;
  }

  public accordianUpdate(ev: any) {
    this.currentLevel = ev.target.value;
    if (!this.currentLevel) return;

    this.loading = true;
    this.server.getStepsByID(this.currentLevel)
      .pipe(
        takeWhile(() => this.alive),
        catchError(async (err) => {
          this.errorText = "Course Content is unavailable";
          await this.utils.presentToast(`${err.statusText}`);
          return of(null);
        }),
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((data: any) => {
        if (!data) {
          this.stepList = [] as any;
          return;
        }
        this.stepList = data;
      })
  }

  public openSlideshow(item: { id: number, title: string, slideshowId: number }) {
    this.router.navigate([`/slideshow`, { slideshowId: item.slideshowId }]);
  }

}
