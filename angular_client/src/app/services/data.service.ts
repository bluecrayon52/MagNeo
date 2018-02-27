import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private BASE_URL = 'http://localhost:5000/';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  result: any;

  constructor(private _http: Http) {
    console.log('Data service connected...');
  }
  createGraph(data) {
    console.log('The data is in good hands now!');
    const layers = data.split('\r');
    console.log('CSV header: ' + layers[0]);

    // create a new artifact

    // create layers
    for (let i = 1; i < layers.length; i++) {
      const layer = layers[i].split(',');

      // skip layers with incomplete data
      let check = 0;
      for (let j = 0; j < layer.length; j++) {
        if (layer[j] === '') {
            check = 1;
            break;
        }
      }
      if ( check === 1) {
        continue;
      }

      console.log(layer);

      const url = `${this.BASE_URL}/layers`;
      this._http.post(url, layer, {headers: this.headers});
      // create a new layer with info in layer[0]-layer[4]

      // layer[0] = name

      // layer[1] = lat

      // layer[2] = lon

      // layer[3] = elev

      // layer[4] = age
    }

    // parse data

    // create artifact

    // for each layer in data
      // createLayer(json)

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
