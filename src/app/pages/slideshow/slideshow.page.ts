import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { NavController } from '@ionic/angular';
import { takeWhile, switchMap, of, map, tap, mergeMap, forkJoin, combineLatest } from 'rxjs';
import { ServerEndpointsService } from 'src/app/common/server-endpoints.service';
import { UtilsService } from 'src/app/common/utils.service';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.page.html',
  styleUrls: ['./slideshow.page.scss'],
})

export class SlideshowPage implements OnInit, OnDestroy {

  public alive: boolean = true;
  public slideshowId: number | null = null;
  public slideshow: I_slider = {} as any;
  public displaySlide: any[] = [
    // {
    //   id: 0,
    //   order: 1,
    //   template: 'IMAGE_TITLE_SENTENCE',
    //   text: 'potato',
    //   images: [
    //     {
    //       url: 'https://p-media-static-language.azureedge.net/images/37452-ynlojhbcbg/previews/screen-6576.jpg'
    //     }
    //   ],
    //   imagesCount: 1,
    //   audioUrl: 'https://p-media-static-language.azureedge.net/audios/1029-tnykarkvtf/file.mp3',
    //   backgroundColor: '#ffffff',
    //   isAnimated: false,
    //   requiresAnswer: false
    // },
    // {
    //   id: 1,
    //   order: 0,
    //   template: 'LETTER_PRESENTATION',
    //   text: 'p',
    //   isAnimated: true,
    //   audioUrl: 'https://p-media-static-language.azureedge.net/audios/18873-upqyjfhqwj/file.mp3',
    //   backgroundColor: '#ffffff',
    //   requiresAnswer: false
    // },
    // {
    //   id: 2,
    //   order: 2,
    //   template: 'MULTIPLE_CHOICE_TEXT',
    //   textOptions: [
    //     { id: 0, expectedSelection: true, text: 'p' },
    //     { id: 1, expectedSelection: false, text: 'a' }
    //   ],
    //   audioUrl: 'https://p-media-static-language.azureedge.net/audios/942490-yvwyjeumgh/file.mp3',
    //   requiresAnswer: true
    // }
  ];

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    public server: ServerEndpointsService,
    public utils: UtilsService) { }

  public ngOnInit() {
    this.activatedRoute.paramMap
      .pipe(
        takeWhile(() => this.alive),
        switchMap((queryParams: ParamMap) => {
          this.slideshowId = Number(queryParams.get('slideshowId')) ?? null;
          if (!this.slideshowId) {
            this.navCtrl.back();
            return of(null);
          }
          return this.server.getSlideShowByID(this.slideshowId);
        }),
        mergeMap((data: I_slider) => {
          const data$ = data?.slides.map((slide: any) => {
            return this.server.getSlidesByID(slide.id)
              .pipe(map((slideObject) => {
                slide = { ...slide, ...slideObject };
                return slide;
              }))
          })
          return forkJoin(...data$);
          // return combineLatest(...data$);
        }),
        tap((data: any[]) => {
          return data.sort((a, b) => a.order - b.order);
        })
      )
      .subscribe((data: any[]) => {
        this.displaySlide = data;
      });
  }

  // IMAGE_TITLE_SENTENCE

  public ngOnDestroy(): void {
    this.alive = false;
  }

}


interface I_slider {
  "id": number,
  "slides": {
    "id": number,
    "order": number,
    "template": "LETTER_PRESENTATION" | "IMAGE_TITLE_SENTENCE" | "MULTIPLE_CHOICE_TEXT",
  }[],
}
