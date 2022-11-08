import { Component, Input, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { interval } from 'rxjs';
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
  contador: number = 0;
  state: boolean = false;
  translate: any;

  constructor(private noticesService: NoticesService) {
    console.log('El componente se ha creado');
    this.h = 0;
    this.notices  = [0,0,0];
  }


  ngOnInit(): void {
    console.log('El componente se ha inizializado');
    this.searchNotice();
    setInterval(()=>{
      this.searchNotice();
    },5000);
  }

  // Método que gestiona la petición de nuevas noticias
  searchNotice = () => {
    console.log(this.h);
    if(this.control){
      this.selectNotices();
      this.control = false;
    }
    if(!this.state){
      this.restNotice();
    }
  }

  // Método que reestablece le contador de noticias cuando h llega a 0
  /*restNotice = () => {
      this.animation_paused();
    for(let i = 0; i < 3; i++){
      if(this.h < 0){
        this.h = this.listNotices.length -1;
      }
      this.notices[i] = this.h;
      this.h--;
    }
    this.animation_running();

  }
  */
  restNotice = () => {
    console.log("state: ");
    console.log(this.state);
    if(!this.state){
      console.log("cambiando la noticia");
      if(this.h < 0){
        this.h = this.listNotices.length -1;
      }else{
        this.h--;
      }
      this.state = true;
      this.translate = "translateX(0px)";
      setTimeout(() => {
        console.log("Hola Mundo");
        this.state = false;
        this.translate = "translateX(550px)";
      }
    , 10000);
    }
  }

   // News Api
/*
  // Método que recibe y gestiona los datos de la petición
   selectNotices = () => {
    this.noticesService.getNotice().subscribe(
      data => {
        console.log(data);
        this.listNotices = data.articles;
        this.h = this.listNotices.length -1;
        this.restNotice();
      });
    setInterval(()=>{
      this.control = true;
    },1800000);
  }
*/

// JasonPlaceHolder
// Descomentar el siguiente método para hacer uso de la API Rest Jason Place Holder

  selectNotices = () => {
      this.noticesService.getNotice().subscribe(
      data => {
      this.listNotices = data;
      this.h = this.listNotices.length -1;
      this.restNotice();
      });

    setInterval(()=>{
      this.control = true;
    },1800000);
  }

}
