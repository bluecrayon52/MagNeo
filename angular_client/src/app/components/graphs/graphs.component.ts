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
  waiting = true;
  layers:   Array<any>;
  layersAndSims: Array<any>;

  constructor(private _dataService: DataService) {

    // for (let i = 1; i <= N; i++) {
    //   for (let m = 2; i * m <= N; m++) {
    //     /** increasing connections toll on connecting nodes */
    //     this.nodes[i - 1].linkCount++;
    //     this.nodes[(i * m) - 1].linkCount++;

    //     /** connecting the nodes before starting the simulation */
    //     this.links.push(new Link(i, i * m));
    //   }
    // }

  }

  ngOnInit() {
    this._dataService.currentMessage.subscribe(message => this.initTheGraph(message));

  }

  waitForIt(val) {
    this.waiting = val;
  }

  initTheGraph(message) {
    console.log('[map.component.ts]: initTheMap message: ' + message);
    this.initGraph();
  }

  getLayers() {
    this._dataService.getLayers().subscribe(
        resp => this.layers = resp
    );
  }

  getSims() {
    this._dataService.getSims().subscribe(
        resp => this.layersAndSims = resp
    );
  }

  initGraph() {
    this.getLayers();
    this.getSims();

    const nodesPromise = () =>
    new Promise((resolve) => {
      console.log('[nodesPromise] CALLED');
      const last = this.layers.length - 1;
      this.layers.map((layer, index) => {
        console.log('[graphs.component.ts] layers.map() layer: ' + layer.name + ', index: ' + index);
        this.nodes.push(new Node(layer.name, index));
        if (index === last) {
          console.log('[nodesPromise] RESOLVED');
          resolve();
        }
      });
    });

    const linksPromise = () =>
    new Promise((resolve) => {
      console.log('[linksPromise] CALLED');
      const last = this.layersAndSims.length - 1;
      this.layersAndSims.map((lAS, index) => {
        console.log('[graphs.component.ts] layersAndSims.map() lAS.layer: ' + lAS.layer + ', index: ' + index);
        const simKeys = Object.keys(lAS.similar.similar);
        const sim = lAS.similar.similar;
        let count = 0;

        for ( let i = 0; i < simKeys.length; i++) {
          const key = simKeys[i];
          console.log('key: ' + key + ', value: ' + sim[key]);
          this.links.push(new Link(lAS.layer, key));
          count++;
        }
        if (index === last && count === simKeys.length) {
          console.log('[linksPromise] RESOLVED');
          resolve();
        }
      });
    });
    nodesPromise()
    // .then(() => linksPromise()
      .then(() => {
        console.log('you can stop waiting now!');
        this.waitForIt(false);
      });
  }
}

