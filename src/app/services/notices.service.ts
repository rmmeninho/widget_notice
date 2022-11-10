import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoticesService{

  constructor(private http: HttpClient) {
    console.log('Servicio Http: ');
  }

  // News API
  // Método que hace la petición a la API Rest NewsAPI

  getNotice(): Observable<any>{
    let fetch: string = new Date().toISOString();
    console.log(fetch);
    let temp: string[] = fetch.split('.');
    console.log(temp);
    temp = temp[0].split('T');
    console.log(temp);
    let day = temp[0];
    console.log("day: "+ day);
    let toret: string = 'https://newsapi.org/v2/everything?q=galicia&from='+day+'&sortBy=publishedAt&apiKey=0dc3db21fb1c4a7daf0a7a6fc6247c2b';
    console.log(toret);

    return this.http.get(toret);
  }

// JasonPlaceHolder
// Descomentar el siguiente método para hacer uso de la API Rest Jason Place Holder
/*
  getNotice(): Observable<any>{
    let toret: string = 'https://jsonplaceholder.typicode.com/photos';
    console.log(toret);
    return this.http.get(toret);
  }
*/
}

