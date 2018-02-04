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

  constructor(private modalService: NgbModal, private dataService: DataService) {
    console.log('constructor ran ...');

   }

  ngOnInit() {
    console.log('ngOnInit ran ...');
  }

  open() {
    const modalRef = this.modalService.open(LoadComponent);
    // modalRef.componentInstance.name = 'World';
  }

}

