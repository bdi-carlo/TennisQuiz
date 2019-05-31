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
  goodDone: any = {"good": 0, "done": 0};

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
    this.myStorage = window.localStorage;
    this.getDatas();
    this.chooseQuestion();
  }

  // Save datas when leaving the page
  ngOnDestroy(){
    //console.log("question -> ngOnDestroy()");
  }

  /**
   * Get datas from the window local storage
  **/
  getDatas(){
    this.datasJson = JSON.parse(this.myStorage.getItem("datas"));
    this.goodDone = JSON.parse(this.myStorage.getItem("goodDone"));
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
    if(index == this.good){
      this.isCorrect = "VRAI";
      this.datasJson.quiz.questions[this.indexQuestion].done = 1;
      this.goodDone.good++;
    }
    else{
      this.isCorrect="FAUX";
      this.datasJson.quiz.questions[this.indexQuestion].done = 0;
    }

    this.goodDone.done++;
    this.checkGameFinished();
    this.isDisabled = true;

    this.myStorage.setItem("datas", JSON.stringify(this.datasJson));
    this.myStorage.setItem("perc", Math.round((this.goodDone.done/this.datasJson.quiz.questions.length)*100).toString());
    this.myStorage.setItem("goodDone", JSON.stringify(this.goodDone));
  }

  /**
   * Check if the player answered to all the questions
  **/
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
