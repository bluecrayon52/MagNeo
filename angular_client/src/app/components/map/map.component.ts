import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service'; // Neo4j Data

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  title: string;
  lat: number;
  lng: number;
  style: any;
  layers: Array<any>;
  testing: Array<any>;

  constructor(private _dataService: DataService) {

        // Access the Data Service's getLayers() method we defined
        this._dataService.getLayers()
            .subscribe(res => this.layers = res.data);
      }



  ngOnInit() {
    // this._dataService.setRel()
    // .subscribe(res => this.layers = res.data);

    console.log('ngOnInit ran ...');
    this.title = 'This is a Map';
    this.lat = 44.836151;   // Bordeaux, France
    this.lng = -0.580816;
    this.style = [
      {
          'featureType': 'all',
          'elementType': 'geometry.fill',
          'stylers': [
              {
                  'weight': '2.00'
              }
          ]
      },
      {
          'featureType': 'all',
          'elementType': 'geometry.stroke',
          'stylers': [
              {
                  'color': '#9c9c9c'
              }
          ]
      },
      {
          'featureType': 'all',
          'elementType': 'labels.text',
          'stylers': [
              {
                  'visibility': 'on'
              }
          ]
      },
      {
          'featureType': 'landscape',
          'elementType': 'all',
          'stylers': [
              {
                  'color': '#f2f2f2'
              }
          ]
      },
      {
          'featureType': 'landscape',
          'elementType': 'geometry.fill',
          'stylers': [
              {
                  'color': '#ffffff'
              }
          ]
      },
      {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [
              {
                  'color': '#ffffff'
              }
          ]
      },
      {
          'featureType': 'poi',
          'elementType': 'all',
          'stylers': [
              {
                  'visibility': 'off'
              }
          ]
      },
      {
          'featureType': 'road',
          'elementType': 'all',
          'stylers': [
              {
                  'saturation': -100
              },
              {
                  'lightness': 45
              },
              {
                'visibility': 'off'       // turned this off
              }
          ]
      },
      {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': [
              {
                  'color': '#eeeeee'
              },
              {
                  'visibility': 'off'       // turned this off
              }
          ]
      },
      {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [
              {
                  'color': '#7b7b7b'
              },
              {
                  'visibility': 'off'       // turned this off
              }
          ]
      },
      {
          'featureType': 'road',
          'elementType': 'labels.text.stroke',
          'stylers': [
              {
                  'color': '#ffffff',
              },
              {
                  'visibility': 'off'       // turned this off
              }
          ]
      },
      {
          'featureType': 'road.highway',
          'elementType': 'all',
          'stylers': [
              {
                  'visibility': 'off'       // turned this off
              }
          ]
      },
      {
          'featureType': 'road.arterial',
          'elementType': 'labels.icon',
          'stylers': [
              {
                  'visibility': 'off'
              }
          ]
      },
      {
          'featureType': 'transit',
          'elementType': 'all',
          'stylers': [
              {
                  'visibility': 'off'
              }
          ]
      },
      {
          'featureType': 'water',
          'elementType': 'all',
          'stylers': [
              {
                  'color': '#46bcec'
              },
              {
                  'visibility': 'on'
              }
          ]
      },
      {
          'featureType': 'water',
          'elementType': 'geometry.fill',
          'stylers': [
              {
                  'color': '#c8d7d4'
              }
          ]
      },
      {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
              {
                  'color': '#070707'
              }
          ]
      },
      {
          'featureType': 'water',
          'elementType': 'labels.text.stroke',
          'stylers': [
              {
                  'color': '#ffffff'
              }
          ]
      },
      {
          'featureType': 'landscape.natural.terrain',      // added this for terrain
          'elementType': 'geometry.fill',
          'stylers': [
            {
                'color': '#eeeeee'
            },
              {
                  'visibility': 'on'
              }
          ]
      }
    ];


  }


}
