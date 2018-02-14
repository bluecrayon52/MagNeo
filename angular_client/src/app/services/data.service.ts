import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  result: any;

  constructor(private _http: Http) {
    console.log('Data service connected...');
  }
  createGraph(data) {
    console.log('The data is in good hands now!');
    console.log(data);

    // parse data

    // create artifact

    // for each layer in data

  }

  getLayers() {
    return this._http.get('/api/layers')
    .map(result => this.result = result.json());

  }

  ///?????????
  // get Rels(){}

  // setLayer(newNode: object){}

  // set a relationship between two layer nodes
  // pass in two layer node names and a relationship object , node1:string, node2:string, rel:object
  setRel() {
    return this._http.get('/api/rel')   // return something for testing purposes
    .map(result => this.result = result.json());
  }

  // returns a Layer object from the DB that matches the name
  getLayer(node: string) {

  }

  // returns the relationship object, if any, that links the two layer nodes passed in
  getRel(node1: string, node2: string) {

  }

}
