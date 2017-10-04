import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { MapComponent } from './components/map/map.component';

import { AgmCoreModule } from '@agm/core';   // angular google maps 
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'; // bootstrap 
import { DataService } from './services/data.service'; // Neo4j Data 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MdButtonModule, MdCheckboxModule, MdSidenavModule, MdToolbarModule} from '@angular/material'; //material modules 



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    MapComponent
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
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
