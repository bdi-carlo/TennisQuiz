import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-versus',
  templateUrl: './versus.page.html',
  styleUrls: ['./versus.page.scss'],
})
export class VersusPage implements OnInit {

  entitled: string;
  choices: Array<string> = ["", "", "", ""];
  good: number = 1;
  isCorrect: string = "PREPARATION";
  isDisabled: boolean = false;
  isInPreparation: boolean = true;
  goodResponse: any;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  inputToQuestion(){
    this.isCorrect = "JOUER";
    this.isInPreparation = false;
  }

  checkAnswer(index){
    //console.log(this.choices[this.good]);
    ( index == this.good-1 ) ? this.isCorrect = "VRAI" : this.isCorrect = "FAUX";

    this.goodResponse = this.choices[this.good-1];
    this.isDisabled = true;
  }

  replay(){
    this.isDisabled = false;
    this.isInPreparation = true;
    this.isCorrect = "PREPARATION";
    this.choices = ["", "", "", ""];
    this.good = 1;
  }

  goBack(){
    this.navCtrl.navigateBack('/home');
  }

}
