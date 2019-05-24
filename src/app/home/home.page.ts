import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  //questionPage: QuestionPage;

  constructor(private navCtrl: NavController){}

  openQuestion(){
    this.navCtrl.navigateForward('/question');
  }

  openAjout(){
    this.navCtrl.navigateForward('/ajout');
  }
}
