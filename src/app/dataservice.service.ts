import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})



export class DataserviceService {

  

  configUrl = 'http://c1d6-35-233-207-234.ngrok.io/predict'

  constructor(private http: HttpClient) { }

  sendData(data: any) {
   const headers= new HttpHeaders()
    .set('content-type', 'application/json')
    .set('Access-Control-Allow-Origin', '*');
    return this.http.post(this.configUrl,data,{ 'headers': headers })
  }

}
