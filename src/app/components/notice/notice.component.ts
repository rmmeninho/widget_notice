import { NgStyle } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { interval, throttleTime } from 'rxjs';
import { TimeInterval } from 'rxjs/internal/operators/timeInterval';
import { NoticesService } from 'src/app/services/notices.service';


@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})

export class NoticeComponent implements OnInit {
  listNotices: any; // esta variable contiene todas las noticias de la petición
  h: number;  // contador de noticias
  notices: number[]; // incluye las 3 proximas noticias a mostrar
  control: boolean = true; // cuando esta variable está a true, se hace una nueva petición a la App para traer noticias actualizadas
  state: boolean = true; // variable de control para los métodos showNotice y hiddenNotice

  constructor(private noticesService: NoticesService) {
    console.log('El componente se ha creado');
    this.h = 0;
    this.notices = [0,0];
  }

  ngOnInit(): void {
    console.log('El componente se ha inizializado');
    this.searchNotice();
    setInterval(()=>{
      this.searchNotice();
      this.state=!this.state;
      this.restNotice(this.state);
    },10000);
  }

  // Método que gestiona la petición de nuevas noticias
  searchNotice = () => {
      if(this.control){
        this.selectNotices();
        this.control = false;
      }
  }

  //Método que gestiona mediante un boolean el método que se ejecuta
  restNotice = (aux: boolean) => {
    if(aux){
      this.showNotice();
    }
    else{
      this.hiddenNotice();
    }
  }

  // Método que desliza al interior de la vista el elemento html con id #notice_1 y oculta id #notice_2
  showNotice = () =>{
    if(this.h > this.listNotices.length-1){
      this.h = 0;
    }
    this.notices[0] = this.h;
    document.getElementById("notice_1")?.style.setProperty('transform', "translateX(0px)");
    document.getElementById("notice_2")?.style.setProperty('transform', "translateX(550px)");
    this.h++;
  }

  // Método que desliza al interior de la vista el elemento html con id #notice_2 y oculta id #notice_1
  hiddenNotice = () =>{
    if(this.h > this.listNotices.length-1){
      this.h = 0;
    }
    this.notices[1] = this.h;
    document.getElementById("notice_1")?.style.setProperty('transform', "translateX(550px)");
    document.getElementById("notice_2")?.style.setProperty('transform', "translateX(0px)");
    this.h++;
  }

   // News Api

  // Método que recibe y gestiona los datos de la petición
   selectNotices = () => {
    this.noticesService.getNotice().subscribe(
      data => {
        console.log(data);
        this.listNotices = data.articles;
        this.h = this.listNotices.length -1;
        this.restNotice(this.state);
      });
    setInterval(()=>{
      this.control = true;
    },1800000);
  }


// JasonPlaceHolder
// Descomentar el siguiente método para hacer uso de la API Rest Jason Place Holder
/*
  selectNotices = () => {
      this.noticesService.getNotice().subscribe(
      data => {
      this.listNotices = data;
      this.h = 0;
      this.restNotice(this.state);
      });

    setInterval(()=>{
      this.control = true;
    },1800000);
  }
*/
}
