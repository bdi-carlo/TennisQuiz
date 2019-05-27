import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  perc: any;

  constructor(private http: HttpClient, private navCtrl: NavController){}

  ngOnInit(){
    console.log("oninit");
    // Take datas from static file assets/data/question.json
    if(window.localStorage.getItem("datas") == undefined){
      interface Response{
        quiz:{
          questions: Array<any>;
        }
      }
      this.http.get<Response>('../assets/data/questions.json').subscribe(data => {
        window.localStorage.setItem("datas", JSON.stringify(data));
        window.setTimeout(() => {},1);
      });
    }
    this.perc = this.getPercEvolution();
    console.log(this.perc);
  }

  ionViewDidEnter(){

  }

  getPercEvolution(){
    if(window.localStorage.getItem("datas") != undefined){
      var questions = JSON.parse(window.localStorage.getItem("datas")).quiz.questions;
      var nbQuestionsDone = 0;
      questions.forEach(function(qst){
        if(qst.done != -1)nbQuestionsDone++;
      });

      return nbQuestionsDone/questions.length;
    }
    return 0;
  }

  openQuestion(){
    this.navCtrl.navigateForward('/question');
  }

  openAjout(){
    this.navCtrl.navigateForward('/ajout');
  }

  reset(){
    window.localStorage.clear();
    this.ngOnInit();
  }
}
