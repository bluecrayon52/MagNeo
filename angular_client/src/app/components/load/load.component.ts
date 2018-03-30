import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { DataService } from '../../services/data.service'; // Neo4j Data

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {
  // message: boolean;

  public fileString;

  constructor(public activeModal: NgbActiveModal, private _dataService: DataService) {
    // tslint:disable-next-line:no-unused-expression
    this.fileString;

   }

   ngOnInit() {
    //  this._dataService.currentMessage.subscribe(message => this.message = message);
  }

   changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    const fileType = inputValue.parentElement.id;

    myReader.onloadend = (e) => {
        this.fileString = myReader.result;
        console.log('Data Preview');
        console.log(this.fileString);
    };

    myReader.readAsText(file);
  }

  submit(): void {
    console.log('Submitted! Thanks!');
    this.activeModal.close('Close click');
    this._dataService.createGraph(this.fileString);
  }
}
