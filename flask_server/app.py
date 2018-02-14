import logging
import logging.handlers
import os
from flask import Flask, jsonify
from flask_classful import route
import markupsafe
import neomodel
from neomodel import (StructuredNode, StringProperty, IntegerProperty,
                      UniqueIdProperty, RelationshipFrom, RelationshipTo,
                      StructuredRel)
from webargs import fields
from grest import GRest, utils, global_config

# metadata for artifact relationship with a layer 
class LocationRel(StructuredRel, utils.Relation):
    # array of m number of motifs and their counts each
    motifs = ArrayProperty(IntegerProperty(default = 0))

# class PetInfo(StructuredRel, utils.Relation):
#     """Pet Information Model (for relationship)"""
#     adopted_since = IntegerProperty()

class Artifact(StructuredNode, utils.Node):
    artifact_id = UniqueIdProperty()
    kind = StringProperty(unique_index=True, required=True) 
    location = RelationshipTo('Layer', 'FOUND', model= LocationRel)

# class Pet(StructuredNode, utils.Node):
#     """Pet model"""
#     pet_id = UniqueIdProperty()
#     name = StringProperty()
#     owner = RelationshipFrom("Person", "HAS_PET")

# metadata for relationships between layers  
class SimilarityRel(StructuredRel, utils.Relation):
    kind = StringProperty(required=True)
    coefficient = FloatProperty(required=True)
     # mark the relationship with the artifact(s) kind used to calculate the coefficient
    artifacts = ArrayProperty(StringProperty(), required=True)

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

    # directionless relationship
    similarity = RelationshipTo('Layer', 'SIMILAR_TO', model=SimilarityRel) # one similarity between each layer node pair per artifact type 

# class Person(StructuredNode, utils.Node):
#     """Person model"""
#     __validation_rules__ = {
#         "first_name": fields.Str(),
#         "last_name": fields.Str(),
#         "phone_number": fields.Str(required=True)
#     }

#     __filtered_fields__ = ["secret_field"]

#     uid = UniqueIdProperty()
#     first_name = StringProperty()
#     last_name = StringProperty()
#     phone_number = StringProperty(unique_index=True, required=True)

#     secret_field = StringProperty(default="secret", required=False)

#     pets = RelationshipTo(Pet, "HAS_PET", model=PetInfo)

class LayersView(GRest):
    # Layer View (/layers)
    __model__ = {
        "primary": Layer,
        "secondary": {
            "similarity": Layer
        }
    }
    __selection_field__ = {
        "primary": "layer_id",
        "secondary": {
            "similarity": "layer_id"
        }
    }
 
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
        
# class PersonsView(GRest):
#     """Person's View (/persons)"""
#     __model__ = {"primary": Person,
#                  "secondary": {
#                      "pets": Pet
#                  }}
#     __selection_field__ = {"primary": "uid",
#                            "secondary": {
#                                "pets": "pet_id"
#                            }}


class ArtifactsView(GRest):
    # Artifact View (/artifacts)
    __model__ = {
        "primary": Artifact,
        "secondary": {
            "location": Layer
        }
    }
    __selection_field__ = {
        "primary": "artifact_id",
        "secondary": {
            "location": "layer_id"
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

    @app.route('/')
    def index():
        return "Hello World"

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