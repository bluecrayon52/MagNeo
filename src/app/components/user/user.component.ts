import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  title: string;
  lat: number;
  lng: number;

  constructor(private dataService: DataService) {
    console.log('constructor ran ...');

   }

  ngOnInit() {
    console.log('ngOnInit ran ...');
    this.title = 'This is a Map';
    this.lat = 51.678418;
    this.lng = 7.809007;
  }

}

