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

  constructor(private _dataService: DataService) {

    const N = APP_CONFIG.N,
    getIndex = number => number - 1;

    /** constructing the nodes array */
    for (let i = 1; i <= N; i++) {
      this.nodes.push(new Node(i));
    }

    for (let i = 1; i <= N; i++) {
      for (let m = 2; i * m <= N; m++) {
        /** increasing connections toll on connecting nodes */
        this.nodes[getIndex(i)].linkCount++;
        this.nodes[getIndex(i * m)].linkCount++;

        /** connecting the nodes before starting the simulation */
        this.links.push(new Link(i, i * m));
      }
    }
  }

  ngOnInit() {

    this._dataService.getLayers().toPromise().then(resp => {this.layers = resp.layers; } ).then(() => this.getRelationships());

    // this._dataService.getLayers().subscribe(resp => {
    //   this.layers = resp.layers;
    //   console.log('[graphs.components.ts]: ngOnInit() getLayers() response:' + resp.layers);
    // });
    // setTimeout(() => { this.getRelationships(); }, 3000);

  }

    getRelationships() {
      // console.log('[graphs.components.ts]: getRelationships() this.layers: ' + this.layers);
      // tslint:disable-next-line:forin
      // for (const layer in this.layers) {
      //   console.log(layer);
      // }
      this.layers.forEach( (layer) => {
        const name = layer.name;
        console.log(name);

        let similarity = [];
        this._dataService.getSim(name).toPromise()
          .then(resp => { similarity = resp.similar; } )
          .then(() => { console.log('[graphs.component.ts] getRelationships() similarity: for ' + name + ' :');
                        console.log(similarity); })
          .catch((error) => console.log('[graphs.component.ts] getRelationships() similarity error: ' + error));
      });
    }
  }

