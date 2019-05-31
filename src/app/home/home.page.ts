import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Platform } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit {

  goodDone: any = {"good": 0, "done": 0};
  perc: any;

  constructor(private http: HttpClient, private navCtrl: NavController){}

  ngOnInit(){
    console.log("ngOnInit()");
  }

  ngOnDestroy(){}

  ionViewWillEnter(){
    console.log("ionViewWillEnter()");
    // Take datas from static file assets/data/question.json
    if(window.localStorage.getItem("datas") == undefined){
      window.localStorage.setItem("perc", "0");
      window.localStorage.setItem("goodDone", JSON.stringify(this.goodDone));
      interface Response{
        quiz:{
          questions: Array<any>;
        }
      }
      this.http.get<Response>('../assets/data/questions.json').subscribe(data => {
        window.localStorage.setItem("datas", JSON.stringify(data));
        window.setTimeout(() => {},1);
      });
    }else{
      this.goodDone = JSON.parse(window.localStorage.getItem("goodDone"));
      this.perc = parseInt(window.localStorage.getItem("perc"));
    }
  }

  openQuestion(){
    this.navCtrl.navigateForward('/question');
  }

  openAjout(){
    this.navCtrl.navigateForward('/ajout');
  }

  reset(){
    window.localStorage.clear();
    location.reload();
  }
}
