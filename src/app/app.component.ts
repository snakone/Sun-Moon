import { Component } from '@angular/core';
import { SettingsService } from './services/services.index';

@Component({
  selector: 'pocketown-root',
  templateUrl: './app.component.html',
  styles: []
})

export class AppComponent {
  title = 'Pocketown The Game';

  constructor(public _settings: SettingsService){
    // Just with an Instance it Loads the Settings
    // because app.component construct everytime the App is created
  }
}
