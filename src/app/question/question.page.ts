import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-question',
  templateUrl: './question.page.html',
  styleUrls: ['./question.page.scss'],
})
export class QuestionPage implements OnInit {

  datasJson: any;
  entitled: string;
  choices: any;
  good: number;
  isCorrect: string = "REPONDRE";
  isDisabled: boolean = false;
  indexQuestion: number;
  myStorage: any;

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.myStorage = window.localStorage;
    this.getDatas();
    this.chooseQuestion();
  }

  // Save datas when leaving the page
  ngOnDestroy(){
    this.myStorage.setItem("datas", JSON.stringify(this.datasJson));
  }

  /**
   * Get datas from the window local storage
  **/
  getDatas(){
    this.datasJson = JSON.parse(this.myStorage.getItem("datas"));
  }

  /**
   * Choose a random question among the list of questions
  **/
  chooseQuestion(){
    if(this.datasJson.quiz.finished != -1){
      console.log("Game finished");
    }
    else{
      var randIndex;
      do{
        randIndex = Math.floor(Math.random() * this.datasJson.quiz.questions.length);
      }while(this.datasJson.quiz.questions[randIndex].done != -1);
      var question = this.datasJson.quiz.questions[randIndex];

      this.indexQuestion = randIndex;
      this.entitled = question.question;
      this.choices = question.choix;
      this.good = question.good;
      this.isDisabled = false;
      this.isCorrect = "REPONDRE";
    }
  }

  /**
   * Check if the answer is good or not and save that the player answer to this question
   * param (number) index: Index of the answer to check
  **/
  checkAnswer(index){
    (index == this.good) ? this.isCorrect = "VRAI" : this.isCorrect="FAUX";
    (index == this.good) ? this.datasJson.quiz.questions[this.indexQuestion].done = 1 : this.datasJson.quiz.questions[this.indexQuestion].done = 0;
    this.checkGameFinished();
    this.isDisabled = true;
  }

  checkGameFinished(){
    var isFinished = true;
    for(let qst of this.datasJson.quiz.questions){
      if(qst.done == -1){
        isFinished = false;
        break;
      }
    }
    if(isFinished == true) this.datasJson.quiz.finished = 1;
  }

  /**
   * Go back to the menu WILL save datas
  **/
  goBack(){
    this.navCtrl.navigateBack('/home');
  }

}
