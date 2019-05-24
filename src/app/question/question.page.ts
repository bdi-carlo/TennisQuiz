import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  datasTxt: any;
  datasJson: any;
  entitled: string;
  choices: any;
  good: number;
  isCorrect: string = "REPONDRE";
  isDisabled: boolean = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.datasTxt = '{"quiz":{"questions":[{"question": "Combien de victoires en Grand Chelem l’Américain Pete Sampras détient-il ?","choix":[{"answer": 12},{"answer": 13},{"answer": 14},{"answer": 15}],"good": 2,"done": -1},{"question": "ComWESH ?","choix":[{"answer": 12},{"answer": 13},{"answer": 14},{"answer": 15}],"good": 0,"done": -1}]}}';
    this.datasJson = JSON.parse(this.datasTxt);

    this.chooseQuestion();
  }

  /**
   * Choose a random question among the list of questions
  **/
  chooseQuestion(){
    var randIndex = Math.floor(Math.random() * this.datasJson.quiz.questions.length);
    var question = this.datasJson.quiz.questions[randIndex];

    this.entitled = question.question;
    this.choices = question.choix;
    this.good = question.good;
    this.isDisabled = false;
    this.isCorrect = "REPONDRE";
  }

  /**
   * Check if the answer is good or not
   * param (number) index: Index of the answer to check
  **/
  checkAnswer(index){
    (index == this.good) ? this.isCorrect = "VRAI" : this.isCorrect="FAUX";
    this.isDisabled = true;
  }

  /**
   * Go back to the menu WILL save datas
  **/
  goBack(){
    this.navCtrl.navigateBack('/home');
  }

}
