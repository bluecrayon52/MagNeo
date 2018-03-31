import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/of';
import { reject } from 'q';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject<boolean>(false);
  currentMessage = this.messageSource.asObservable();

  private BASE_URL = 'http://localhost:5000';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  result: any;

  testArray = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6', 'Test7', 'Test8', 'Test9', 'Test10', 'Test11', 'Test12'];
  private layers: Array<any> = [];
  private layersAndSims: Array<any> = [];

  constructor(private _http: Http) {
    console.log('Data service connected...');
  }

  changeMessage(message: boolean) {
    this.messageSource.next(message);
  }

  createGraph(data) {
    console.log('The data is in good hands now!');
    const layers = data.split('\r');
    console.log('CSV header: ' + layers[0]);
    console.log ('layers: ' + layers);
    const allMotifs = [];
    const promises = [];

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
      promises.push(this._http.post(url, body, {headers: this.headers}));
    }
    console.log('[outside for loop] promises.length: ' + promises.length);
    Observable.forkJoin(promises).toPromise().then(() => this.calcBrainerdRobinson(allMotifs));
  }

  calcBrainerdRobinson(allMotifs) {
    // get the mitif count data
    const allMotifsAgain = [];
    console.log('[data.service.ts]: calcBrainerdRobinson(), allMotifs: ' + allMotifs);
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

    }
    const url = `${this.BASE_URL}/layers/brcs`;

    const tempChunk = {
      'layers': allMotifsAgain
    };

    const bigChunk = JSON.stringify(tempChunk);
    console.log('bigChunk: ' + bigChunk);
    this._http.post(url, bigChunk, {headers: this.headers})
      .toPromise().then(() => this.getLayersInternally(),
                  err => console.log(err)
      );
  }

  getLayersInternally() {
    console.log('[data.service.ts]: getLayersInternally CALLED' );
    const url = `${this.BASE_URL}/layers`;
    console.log('[data.service.ts]: getLayersInternally url:' + url);
    this._http.get(url, {headers: this.headers}).map(response => response.json()).toPromise()
    .then(resp => this.layers = resp.layers)
    .then(() => {
      // this.changeMessage(true);
      console.log('[data.service.ts]: getLayersInternally this.layers.length :' + this.layers.length);
      this.getSimInternally();
    }, err => console.log(err));
  }

  getSimInternally() {
    const promises = [];
    let omitted = 0;

    const simPromise = (name, sims) =>
    new Promise((resolve) => {
      const oldLength = this.layersAndSims.length;
      console.log('oldLength: ' + oldLength);
      const newLength = this.layersAndSims.push(
        {layer: name, similar: sims}
      );
      console.log('newLength: ' + newLength);
      if (newLength === this.layers.length - omitted) {
        console.log('[data.service.ts]: getSimInternally ALL DONE');
        this.changeMessage(true);
      }
      if (newLength > oldLength) {
        console.log('resolving.....');
        resolve();
      }
    });

    console.log('[data.service.ts]: getSimInternally CALLED' );
    this.layers.map( (layer) => {
      const url = `${this.BASE_URL}/layers/` + layer.name + `/similar`;
      console.log('[data.service.ts]: getSimInternally url:' + url);
      this._http.get(url, {headers: this.headers}).map(response => response.json()).toPromise()
      .then(resp => {
        simPromise(layer.name, resp);
        }, err => {
          omitted++;
          console.log(err);
        });
    });
  }

  // getLayers() {
  //   const url = `${this.BASE_URL}/layers`;
  //   console.log('[data.service.ts]: getLayers url:' + url);
  //   return this._http.get(url, {headers: this.headers}).map(response => response.json());
  // }

  getLayers() {
    return Observable.of(this.layers);
  }

 // getSim(name) {
  //   const url = `${this.BASE_URL}/layers/` + name + `/similar`;
  //   console.log('[data.service.ts]: getSim url:' + url);
  //   return this._http.get(url, {headers: this.headers}).map(response => response.json());
  // }

  getSims() {
    return Observable.of(this.layersAndSims);
  }

}
