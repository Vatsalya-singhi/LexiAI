import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute);

  constructor() { }

  ngOnInit() {
    console.log('about page init');
  }

}
