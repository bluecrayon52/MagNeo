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

  constructor(private modalService: NgbModal, private dataService: DataService) {
    console.log('constructor ran ...');

   }

  ngOnInit() {
    console.log('ngOnInit ran ...');
    this.viewM = true;
  }

  open() {
    const modalRef = this.modalService.open(LoadComponent);
    // modalRef.componentInstance.name = 'World';
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

