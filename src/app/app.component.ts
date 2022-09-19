import { Component } from '@angular/core';
import { DataserviceService } from './dataservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'NLP-FrontEnd';

  context: string = '';
  question: string = '';
  showData: boolean = false;
  reqData: any;
  answerData: any;
  reqArrayData: any;
  contextData: any;
  questionData: any;
  contextHighlightData: any
  questionHighlightData: any;
  contextArray: any;
  contextflattenData = "";
  contextFinalHighlightData: any = [];
  response: any;


  constructor(private dataServ: DataserviceService) { }

  postData() {

    let request = {
      context: this.context,
      question: this.question
    }

    this.dataServ.sendData(request).subscribe((response) => {

      this.showData = true;
      this.reqData = response
      this.reqArrayData = Object.entries(this.response)
      this.answerData = this.reqArrayData[0]
      this.contextData = this.reqArrayData[1]
      this.contextHighlightData = this.reqArrayData[2]
      this.contextHighlightData = this.contextHighlightData[1]
      this.questionData = this.reqArrayData[3]
      this.questionHighlightData = this.reqArrayData[4]
      this.contextArray = this.contextData[1].split(" ")
      this.createContextHighlightData()
      this.createContextHighlight()
    })
  }

  createContextHighlightData() {
    for (let i = 0; i < this.contextHighlightData.length; i++) {
      this.contextflattenData += `${this.contextHighlightData[i]}` + ` `
    }
    this.contextHighlightData = this.contextflattenData.split(" ")
    console.log(this.contextHighlightData)
  }

  createContextHighlight() {
    let flag
    for (let j = 0; j < this.contextArray.length; j++) {
      for (let i = 0; i < this.contextHighlightData.length; i++) {
        flag = 0;
        if (this.contextArray[j] == this.contextHighlightData[i]) {
          let req = { value: this.contextArray[j], highlight: true }
          this.contextFinalHighlightData.push(req)
          flag = 1
          break;
        }
      }
      if (flag == 0) {
        let req = { value: this.contextArray[j], highlight: false }
        this.contextFinalHighlightData.push(req)
      }
    }
  }



  clearData() {
    this.context = '';
    this.question = '';
  }
}

