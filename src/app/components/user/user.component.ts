import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  name: string;
  age: number;
  email: string;
  address: Address;
  hobbies: string[];
  hello: any;

  constructor(private dataService: DataService) {
    console.log('constructor ran ...');
   }

  ngOnInit() {
    console.log('ngOnInit ran ...');

    this.name = 'Nathan';
    this.age = 30;
    this.email = 'ncarnold@uncg.edu';
    this.address = {
      street: '870 W 4th St',
      city: 'Winston-Salem',
      state: 'NC',
      zip: 27101
    };

    this.hobbies = ['play guitar', 'exercise', 'cooking'];
    this.hello = 'anything';
  }

  onClick() {
    console.log('onClick ran ...');
    this.name = 'NeoMag App';
    this.hobbies.push('Angular');

  }

  addHobby(hobby) {
    console.log(hobby);
    this.hobbies.unshift(hobby);
    return false;
 }

 deleteHobby(hobby) {
   console.log(hobby);
   for ( let i = 0; i < this.hobbies.length; i++) {
      if (this.hobbies[i] === hobby) {
        this.hobbies.splice(i, 1);
      }
   }
 }
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: number;
}
