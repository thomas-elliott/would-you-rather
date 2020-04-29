import {Component} from '@angular/core';
import {NavController} from '@ionic/angular';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage {
  code: string;

  constructor(private navController: NavController) { }

  submitCode() {
    this.navController.navigateForward(['/submit', this.code]);
  }
}
