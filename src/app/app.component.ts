import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Courses', url: '/courses', icon: 'book' },
    { title: 'My Courses', url: '/my-courses', icon: 'school' },
    { title: 'Profile', url: '/profile', icon: 'person' },
    { title: 'Notifications', url: '/notifications', icon: 'notifications' },
    { title: 'Messages', url: '/messages', icon: 'mail' },
    { title: 'Calendar', url: '/calendar', icon: 'calendar' },
    { title: 'Assignments', url: '/assignments', icon: 'clipboard' },
    { title: 'Resources', url: '/resources', icon: 'folder' },
    { title: 'Settings', url: '/settings', icon: 'settings' },
    { title: 'Support', url: '/support', icon: 'help' },
    { title: 'About', url: '/about', icon: 'information-circle' }
  ];

  constructor() { }
}
