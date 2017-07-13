import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  version = 0.2;
  constructor(public navCtrl: NavController) {
    
  }

}
