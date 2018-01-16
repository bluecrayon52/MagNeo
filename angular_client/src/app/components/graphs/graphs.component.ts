import { Component, OnInit} from '@angular/core';
import { DataService } from '../../services/data.service'; // Neo4j Data

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {

  // locally hold the layers from the graphDB
  layers: Array<any>;

  constructor(private _dataService: DataService) {

        // Access the Data Service's getLayers() method we defined
        this._dataService.getLayers()
            .subscribe(res => this.layers = res.data);

      }

  ngOnInit() {

  }


}
