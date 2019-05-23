import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  //questionPage: QuestionPage;

  constructor(public navCtrl: NavController){}

  openQuestion(){
    console.log("Enter in function: openQuestion()");
    this.navCtrl.navigateForward('/question');
  }
}
