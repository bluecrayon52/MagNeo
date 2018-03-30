import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {LoadComponent} from './../load/load.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  viewM: boolean;
  viewG: boolean;
  message: boolean;

  constructor(private modalService: NgbModal, private _dataService: DataService) {
    console.log('constructor ran ...');
   }

  ngOnInit() {
    console.log('ngOnInit ran ...');
    this._dataService.currentMessage.subscribe(message => this.loadMapView(message));
    this._dataService.getLayersInternally();
  }

  loadMapView(message) {
    console.log('[map.component.ts]: loadMapView message: ' + message);
    this.viewM = true;

  }

  open() {
    const modalRef = this.modalService.open(LoadComponent);
  }

  viewMap() {
    this.viewG = false;
    this.viewM = true;
  }

  viewGraph() {
   this.viewM = false;
   this.viewG = true;
  }
}

