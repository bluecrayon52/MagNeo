
# MagNeo (Magdalenian Neo4j)   
Magneo is a  web application that analyzes the social networks of the Magdalenian Era in Europe using artifact data.  
This project was generated with:  
- [Angular CLI](https://github.com/angular/angular-cli) version 1.3.2.  
- gREST, a Flask REST API framework for Neo4j 
- Neo4j, a graph data base
---
## Prerequisites: 
The following instructions assume you are using a bash command line.

--- 
### Install Neo4j: 
Magneo was developed using a locally hosted instance of neo4j v3.4.0.  
Visit the [neo4j website](https://neo4j.com/download/other-releases/) to download a tar ball (for mac) or zip file (for windows) for v3.4.0 or the latest release.  
After untarring or unzipping the download, place the resulting neo4j folder somewhere that is convienient for you to access it via the terminal. 

---
### Set Up a Python 3 Virtual Environment:  
To create a virtual environemt using the python 3 standard library function venv, you should create a new directory to house your virtual environments if you don't already have one and execute a command with the following format: 

```bash 
python3 -m venv /path/to/new/virtual/environment
```
For example, if your virtual environment directory is called Envs and sits at the root of your User space, and if you wanted to create a new virtual environment called python3_env for python version 3.6, you would exectute the following command from the root of your User space: 

```bash 
python3.6 -m venv Envs/python3_env
```

---

### Set up the Development Angular:
First you will need to install [Node.js and npm](https://nodejs.org/en/download/) if you haven't already, then you can install the [Angular CLI](https://github.com/angular/angular-cli) globally by running the following command: 
```bash 
npm install -g @angular/cli
```

--- 
## Starting Up the Stack:
---
### Start the Local Neo4j DataBase:
Navigate to wherever you placed the neo4j release folder in your local machine and execute something like the following command:
``` bash
$ neo4j-community-3.4.0/bin/neo4j console
```
Note, in the above command it is assumed that you are using neo4j community version 3.4.0.  
If you are using a different version, simply modify the above command to reflect that differece.  

---
### Activate the Python 3 Virtual Environment:
In order to run the Flask API, you must first activate the python virtual environment you set up earlier by executing something like the following command:
``` bash
$ source ~/Envs/python3_env/bin/activate
```
Note, if you have named your virtual environment directory something other than Envs or your python 3 virtual environment something other than python3_env simply modify the above command to reflect the differences. 

---
### Serve the the Flask REST API: 

After you have activated the python 3 virtual environment, you can serve the Flask API by executing the following command from within the **/flask_server** sub-directory of Magneo: 
```bash 
$ python app.py 
```
---
### Start the Angular Client:
To start the Angular client, simply run the following commands from within the **/angular_client** sub-directory of Magneo: 
```bash 
$ ng build
$ ng serve 
```

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

---

