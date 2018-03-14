import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  private BASE_URL = 'http://localhost:5000';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});

  result: any;

  constructor(private _http: Http) {
    console.log('Data service connected...');
  }

  createGraph(data) {
    console.log('The data is in good hands now!');
    const layers = data.split('\r');
    console.log('CSV header: ' + layers[0]);
    console.log ('layers: ' + layers);
    const allMotifs = [];

    // create layers
    for (let i = 1; i < layers.length; i++) {
      const layer = layers[i].split(',');
      const someMotifs = [];

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

      // drop metadata from layers
      someMotifs.push(layer[0]);  //  add the layer name
      const tempMotifs = layer.slice(5);
      for (let j = 0; j < tempMotifs.length; j++) { // add motif counts
        someMotifs.push(tempMotifs[j]);
      }
      allMotifs.push(someMotifs);

      console.log(layer);

      const url = `${this.BASE_URL}/layers`;
      const layerData = {
        'name': layer[0],
        'lat': layer[1],
        'lon': layer[2],
        'elev': layer[3],
        'age': layer[4]
        };

      const body = JSON.stringify(layerData);
      console.log(body);
      this._http.post(url, body, {headers: this.headers})
      .subscribe(() => {},
                  err => console.log(err)
      );

    }
    // TODO: create a new artifact
    // get the mitif count data
    const allMotifsAgain = [];
    console.log('allMotifs: ' + allMotifs);
    for (let i = 0; i < allMotifs.length; i++) {
      const someMotifs = allMotifs[i];
      const motifArray = someMotifs.slice(1);
      const motifInts = [];

      // convert strings to integers
      for (let j = 0; j < motifArray.length; j++) {
       motifInts.push(parseInt(motifArray[j], 10));
      }

      const layerMotifs = {
        'name': someMotifs[0],
        'motifs': motifInts,
      };

      allMotifsAgain.push(layerMotifs);

      // const chunk = JSON.stringify(layerMotifs);
      // console.log('chunk: ' + chunk);
    }
    const url = `${this.BASE_URL}/layers/brcs`;

    const tempChunk = {
      'layers': allMotifsAgain
    };

    const bigChunk = JSON.stringify(tempChunk);
    console.log('bigChunk: ' + bigChunk);
    this._http.post(url, bigChunk, {headers: this.headers})
      .subscribe(() => {},
                  err => console.log(err)
      );
    // pass only layer names and motif counts to flask REST API in a chunk
    // const chunk = JSON.stringify(allMotifs);
    // console.log('chunk: ' + chunk);
  }

  getLayers() {
    const url = `${this.BASE_URL}/layers`;
    return this._http.get(url)
    .map(result => this.result = result.json());
  }

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
