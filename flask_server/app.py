from __future__ import print_function # for printing to console 
import sys  # for printing to console
import pandas as pd # for converting JSON to dataframe
import logging
import logging.handlers
import os
from brcs import brcs # import thee function that give the similarity matrix 
from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin
from flask_classful import route
import markupsafe
import neomodel
from neomodel import (StructuredNode, StringProperty, IntegerProperty,
                      UniqueIdProperty, RelationshipFrom, RelationshipTo,
                      StructuredRel, ArrayProperty, FloatProperty)
from webargs import fields
from grest import GRest, utils, global_config

# metadata for artifact relationship with a layer 
class motifRel(StructuredRel, utils.Relation):
    # array of m number of motifs and their counts each
    motifs = ArrayProperty(IntegerProperty(default = 0))

class Artifact(StructuredNode, utils.Node):
    artifact_id = UniqueIdProperty()
    kind = StringProperty(unique_index=True, required=True) 


# metadata for relationships between layers  
class SimilarityRel(StructuredRel, utils.Relation):
    kind = StringProperty()    # required=True
    coefficient = FloatProperty(required=True)
     # mark the relationship with the artifact(s) kind used to calculate the coefficient
    artifacts = ArrayProperty(StringProperty()) # required=True 

class Layer(StructuredNode, utils.Node):
    __validation_rules__ = {
        "name": fields.Str(),
        "lat": fields.Str(),
        "lon": fields.Str(),
        "elev": fields.Str(),
        "age": fields.Str(),  
    }

    __filtered_fields__ = ["secret_field"]

    layer_id = UniqueIdProperty()
    name = StringProperty(unique_index=True, required=True)
    lat = FloatProperty() 
    lon = FloatProperty()
    elev = FloatProperty()
    # age choices 
    AGES = ( 
        ('U', 'Upper'),
        ('M', 'Middle'),
        ('L', 'Late')
    )
    age = StringProperty(choices=AGES)

    secret_field = StringProperty(default="secret", required=False)

    # relationship to other Layers 
    similarity = RelationshipTo('Layer', 'SIMILAR_TO', model=SimilarityRel) # one similarity between each layer node pair per artifact type 

    # relationship to Artifacts
    motifs = RelationshipTo('Artifact', 'FOUND', model= motifRel)

class LayersView(GRest):
    # Layer View (/layers)
    __model__ = {
        "primary": Layer,
        "secondary": {
            "similarity": Layer,
            "motifs": Artifact
        }
    }
    __selection_field__ = {
        "primary": "name",
        "secondary": {
            "similarity": "name",
            "motifs": "artifact_id"
        }
    }
    
    # route for calling brcs, making a new Artifact with LocactionRel, 
    # find Layer by name, make SimilarityRel based on brcs matrix 
    @route("/brcs", methods=["POST"])
    def brcs(self):
        try: 
            req_data = request.get_json()
            if 'layers' in req_data:
                layers = req_data['layers']
                layersDF = pd.DataFrame(layers)
                layersDF.set_index('name', inplace=True)
                layersDF.reset_index(inplace=True)
                numOMos = len(layersDF.ix[0,1]) # number of motifs 

                # compile the column names
                colNames = ['name']
                for i in range(0,numOMos):
                    col = 'mitif_%d' % i
                    colNames.append(col)
                
                # initialize an empty df with the right col names 
                layersDF2 = pd.DataFrame(columns=colNames)

                # populate the new df
                for index, row in layersDF.iterrows():
                    newRow = [row['name']]
                    for mo in row['motifs']:
                        newRow.append(mo)
                    layersDF2.loc[index] = newRow

                # convert names to string
                layersDF2['name'] = layersDF2['name'].astype(str)

                # convert motifs to int64
                for col in layersDF2.columns:
                    if col == 'name':
                        continue 
                    layersDF2[col] = layersDF2[col].astype(str).astype(int)

                simMatrix = brcs(layersDF2, True)
                dim = len(simMatrix.index) # dimension of matrix

                # iterate over the top right half of the matrix 
                for row in range(0, dim - 1):
                    layerFromName = simMatrix.index[row]
                    layerFrom = Layer.nodes.get(**{self.__selection_field__.get("primary"): str(layerFromName)})
                    if (layerFrom):
            
                        for col in range(row + 1, dim):
                            layerToName = simMatrix.columns[col]
                            layerTo = Layer.nodes.get(**{self.__selection_field__.get("primary"): str(layerToName)})
                            value = simMatrix.ix[row,col]

                            if (layerTo):
                                if (value!=0):
                                    json_data = {"kind":"BR", "coefficient": value, "artifacts":["horse"]}
                                    similarity = layerFrom.similarity.connect(layerTo, json_data)
                            else:
                                return jsonify(errors=["layerTo: "+str(layerToName)+" does not exist as a node in the graph."]), 404
                    else: 
                        return jsonify(errors=["layerFrom: "+str(layerFromName)+" does not exist as a node in the graph."]), 404
            else: 
                return jsonify(errors=["The request data has no 'layers' attribute."]), 404

            return jsonify(result="OK"), 200

        except:
            return jsonify(errors=["An error occurred while attempting to calculate layer similarity."]), 500


    # route for getting all the similar layers of a given layer 
    @route("/<layer_id>/similar", methods=["GET"])
    def similar(self, layer_id):
        try:
            layer = Layer.nodes.get(**{self.__selection_field__.get("primary"):
                                   str(markupsafe.escape(layer_id))})
            # if the layer exists 
            if (layer):
                # get the similarity relationship 
                similar_layers = layer.similarity.get()

                # if there are similar layers 
                if (similar_layers):

                    # return them as a json dictionary 
                    return jsonify(similar=similar_layers.to_dict()), 200
                else:
                    return jsonify(errors=["Selected layer has no similarity relationships."]), 404
            else:
                return jsonify(errors=["Selected layer does not exists!"]), 404
        except:
            return jsonify(errors=["An error occurred while attempting to get the layer similarity."]), 500
        


class ArtifactsView(GRest):
    # Artifact View (/artifacts)
    __model__ = {
        "primary": Artifact,
        "secondary": {
        }
    }
    __selection_field__ = {
        "primary": "artifact_id",
        "secondary": {
        }
    }

    # route for getting all locations of a given artifact 
    @route("/<artifact_id>/locations", methods=["GET"])
    def locations(self, artifact_id):
        try:
            artifact = Artifact.nodes.get(**{self.__selection_field__.get("primary"):
                                   str(markupsafe.escape(artifact_id))})
            # if the artifact exists 
            if (artifact):

                # get the location relationship
                current_locations = artifact.location.get()

                # if there are locations
                if (current_locations):

                    # return them as a json dictionary 
                    return jsonify(locations=current_locations.to_dict()), 200
                else:
                    return jsonify(errors=["Selected pet has not been adopted yet!"]), 404
            else:
                return jsonify(errors=["Selected pet does not exists!"]), 404
        except:
            return jsonify(errors=["An error occurred while processing your request."]), 500


def create_app():
    # The Flask app
    app = Flask(__name__)
    CORS(app)

    logging.getLogger('flask_cors').level = logging.DEBUG

    @app.route('/')
    def index():
        return "MagNeo Server"

    neomodel.config.DATABASE_URL = 'bolt://neo4j:magneo@localhost:7687'
    neomodel.config.AUTO_INSTALL_LABELS = True
    neomodel.config.FORCE_TIMEZONE = True  # default False

    if (global_config.LOG_ENABLED):
        logging.basicConfig(filename=os.path.abspath(os.path.join(
            global_config.LOG_LOCATION, global_config.LOG_FILENAME)), format=global_config.LOG_FORMAT)
        app.ext_logger = logging.getLogger()
        app.ext_logger.setLevel(global_config.LOG_LEVEL)
        handler = logging.handlers.RotatingFileHandler(
            os.path.abspath(os.path.join(
                global_config.LOG_LOCATION, global_config.LOG_FILENAME)),
            maxBytes=global_config.LOG_MAX_BYTES,
            backupCount=global_config.LOG_BACKUP_COUNT)
        app.ext_logger.addHandler(handler)
    else:
        app.ext_logger = app.logger
    
    # Routes
    LayersView.register(app, route_base="/layers", trailing_slash=False)
    ArtifactsView.register(app, route_base="/artifacts", trailing_slash=False)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, threaded=True)