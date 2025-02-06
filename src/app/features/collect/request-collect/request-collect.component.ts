import { Component } from '@angular/core';

@Component({
  selector: 'app-request-collect',
  templateUrl: './request-collect.component.html',
  styleUrl: './request-collect.component.css'
})
export class RequestCollectComponent {
  isModalOpen: boolean = false;

  OpenModal(){
    this.isModalOpen = true;
  }
  CloseModal(){
    this.isModalOpen = false;
  }

}
