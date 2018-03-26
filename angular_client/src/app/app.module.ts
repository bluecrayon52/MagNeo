import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { MapComponent } from './components/map/map.component';
import { GraphsComponent } from './components/graphs/graphs.component'; // material modules
import { LoadComponent } from './components/load/load.component';
import { DataService } from './services/data.service'; // Neo4j Data

import { AgmCoreModule } from '@agm/core';   // angular google maps
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // bootstrap
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdSidenavModule, MdToolbarModule} from '@angular/material';

import { D3Service} from './services/d3.service';
import { D3_DIRECTIVES} from './d3/directives';
import { GraphComponent } from './visuals/graph/graph.component';
import { SHARED_VISUALS } from './visuals/shared';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MapComponent,
    GraphsComponent,
    LoadComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdSidenavModule,
    MdToolbarModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCFrdsvRcV562OQXO9BEsibOvTCNYtyUvc'
    })
  ],
  providers: [DataService, D3Service],   // any component can inject this into their constructor 
  bootstrap: [AppComponent, LoadComponent]


})
export class AppModule { }
