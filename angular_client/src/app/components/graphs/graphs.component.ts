import { Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service'; // Neo4j Data
import APP_CONFIG from './../../app.config';
import { Node, Link } from '../../d3/models';

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  nodes: Node[] = [];
  links: Link[] = [];

  layers: Array<any>;
  layersAndSims: Array<any>;

  constructor(private _dataService: DataService) {

    // const tempLayersAndSims = [];
    // this._dataService.getLayers().toPromise()
    // .then(resp => { this.layers = resp.layers;
    // console.log('[graphs.component.ts]: constructor getLayers() response layers length: ' + resp.layers.length); })
    // .then(() => {
    //   this.layers.map( (layer) => {
    //     let similarity = [];
    //     this._dataService.getSim(layer.name).toPromise()
    //     .then(resp => { similarity = resp.similar; })
    //     .then(() => { tempLayersAndSims.push({layer: layer.name, similar: similarity}); })
    //     .catch((error) => console.log('[graphs.component.ts] getRelationships() similarity error: ' + error));
    //   });
    //   this.layersAndSims = tempLayersAndSims;
    // }).then(() => console.log(this.layersAndSims) );

    // this._dataService.getLayers().toPromise()
    // .then(resp => { this.layers = resp.layers;
    // console.log('[graphs.component.ts]: constructor getLayers() response layers length: ' + resp.layers.length); })
    // .then(() => {

    /* construct the node array */

    // const N = this.layers.length;
    // console.log('[graphs.component.ts] N: ' + N );
    // this.layers.map((layer, index) => {
    //   console.log('[graphs.component.ts] layers.map() layer.name: ' + layer.name + ', index: ' + index);
    //   this.nodes.push(new Node(layer.name, index));
    // });

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[i - 1].linkCount++;
    //     this.nodes[(i * m) - 1].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m));
    //   }
    // }

    // }).then(() => {console.log('[graphs.component.ts] nodes.length: ' + this.nodes.length); } );

    // .then(() => {
    //   this.layers.map( (layer) => {
    //     let similarity = [];
    //     this._dataService.getSim(layer.name).toPromise()
    //     .then(resp => { similarity = resp.similar;
    //     console.log('[graphs.component.ts]: constructor similarity' + similarity);
    //     /* connect nodes with links */
    //     })
    //     .catch((error) => console.log('[graphs.component.ts] getRelationships() similarity error: ' + error));
    //   });
    // });


    const N = 20,
    getIndex = number => number - 1;

    /** constructing the nodes array */
    this._dataService.layers.map((layer, index) => {
      console.log('[graphs.component.ts] layers.map() layer.name: ' + layer.name + ', index: ' + index);
      this.nodes.push(new Node(layer.name, index));
    });


    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[getIndex(i)].linkCount++;
    //     this.nodes[getIndex(i * m)].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m));
    //   }
    // }
  }

  ngOnInit() {

    // this._dataService.getLayers().toPromise().then(resp => {this.layers = resp.layers; } ).then(() => this.getRelationships());

    // this._dataService.getLayers().subscribe(resp => {
    //   this.layers = resp.layers;
    //   console.log('[graphs.components.ts]: ngOnInit() getLayers() response:' + resp.layers);
    // });
    // setTimeout(() => { this.getRelationships(); }, 3000);

  }

}

