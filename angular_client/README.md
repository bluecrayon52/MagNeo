
# MagNeo (Magdalenian Neo4j)   
Magneo is a  web application that analyzes the social networks of the Magdalenian Era in Europe using artifact data.  
This project was generated with:  
- [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.  
- Flask REST API  
- Neo4j 
---
## Prerequisites: 
---
### Install Neo4j: 
Magneo was developed using a locally hosted instance of neo4j v3.4.0.  Visit the [neo4j website](https://neo4j.com/download/other-releases/) to download a tar ball (for mac) or zip file (for windows) for v3.4.0 or the latest release. After untarring or unzipping the download, place the resulting neo4j folder somewhere that is convienient for you to access it via the terminal. 

---
### Set Up a Python 3 Virtual Environment:

---

### Install Angular:

--- 
## Starting Up the Stack:
---
### Start the Local Neo4j DataBase 
Navigate to wherever you placed the neo4j release folder in your local machine and execute the following command:
``` bash
$ neo4j-community-3.4.0/bin/neo4j console
```
---
### Activate the Python 3 Virtual Environment

``` bash
$ source ~/Envs/python3_env/bin/activate

```
---
## Activate the the Flask REST API 

```bash 
$ python app.py 
```
---
## Start the Angular Client 

```bash 
$ ng build
$ ng serve 
```
---
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

=======

