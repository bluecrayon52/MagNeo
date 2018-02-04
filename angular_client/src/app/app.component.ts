import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  url = 'http://localhost:8000/n4jg-layer';
  constructor(private http: Http) {}

  public getLayers() {

      this.http.get(this.url).toPromise().then((res) => {
          console.log(res.json());
      });

  }

}
