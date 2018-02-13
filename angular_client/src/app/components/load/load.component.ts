import { Component, Input, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  public fileString;

  constructor(public activeModal: NgbActiveModal) {
    // tslint:disable-next-line:no-unused-expression
    this.fileString;
   }

   ngOnInit() {
  }

   changeListener($event): void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    const file: File = inputValue.files[0];
    const myReader: FileReader = new FileReader();
    const fileType = inputValue.parentElement.id;

    myReader.onloadend = (e) => {
        // myReader.result is a String of the uploaded file
        console.log(myReader.result);
        this.fileString = myReader.result;
        console.log('give me some space');
        console.log(this.fileString);
    };

    myReader.readAsText(file);
  }

  submit(): void {
    // pass fileString allong to a parser to be sent to server
    console.log('Submitted! Thanks!');
    this.activeModal.close('Close click');
    const dataArray = this.fileString.split('\n');
    console.log(dataArray[1]);
  }

}
