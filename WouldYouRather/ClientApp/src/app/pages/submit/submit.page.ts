import { Component, OnInit } from '@angular/core';
import { GameService } from '../../service/game.service';
import { HttpErrorResponse } from '@angular/common/http';
import {AuthService} from '../../service/auth.service';
import {Game} from '../../model/game.model';
import {AlertController} from '@ionic/angular';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.page.html',
  styleUrls: ['./submit.page.scss'],
})
export class SubmitPage implements OnInit {
  submitMessage = environment.submitMessage;
  submitSuccessMessage = environment.submitSuccessMessage;
  submitSuccessButton = environment.submitSuccessButton;
  submitErrorMessage = environment.submitErrorMessage;
  answer: string;
  game: Game;
  ready = false;
  loading = false;

  constructor(private gameService: GameService,
              private authService: AuthService,
              private alertCtrl: AlertController) { }

  ngOnInit() {
    this.authService.getGame().then(
        (resolve) => {
          this.game = resolve;
          this.ready = true;
    });
  }

  disableSubmit(): boolean {
    return this.loading || this.answer == null || this.answer.length < 1;
  }

  submit() {
    this.loading = true;
    this.gameService.submitAnswer(this.game.id, this.answer).subscribe(
      (response: any) => {
        this.answer = '';
        this.loading = false;
        this.showSuccessfulAlert();
      },
      (error: HttpErrorResponse) => {
        this.loading = false;
        this.showErrorAlert();
        console.error('Received error submitting answer ', error);
    });
  }

  async showSuccessfulAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Received answer',
      message: this.submitSuccessMessage,
      buttons: [this.submitSuccessButton]
    });

    await alert.present();
  }

  async showErrorAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Error',
      message: this.submitErrorMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
}
