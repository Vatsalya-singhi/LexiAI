import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  public darkMode: boolean;
  public selectedLanguage: string;
  public enableNotifications: boolean;

  constructor() {
    // this.darkMode = this.themeService.isDarkMode(); // Get initial dark mode status
    this.darkMode = true;
    this.selectedLanguage = 'en'; // Set default language
    this.enableNotifications = true; // Set default notification status
  }

  ngOnInit() {
    console.log('settings page init');
  }

  toggleDarkMode() {
    // this.themeService.setDarkMode(this.darkMode); // Apply dark mode setting
  }

  goToAccountSettings() {
    // Implement navigation logic to account settings page if needed
    // console.log('Navigating to account settings page...');
  }

}
