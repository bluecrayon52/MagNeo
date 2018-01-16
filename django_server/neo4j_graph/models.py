from django.db import models
from neomodel import (config, StructuredNode, StringProperty, ArrayProperty, IntegerProperty, 
FloatProperty, UniqueIdProperty, StructuredRel, Relationship, RelationshipTo, RelationshipFrom, OneOrMore, One)

# config.DATABASE_URL = 'bolt://neo4j:magneo@localhost:7687'

# metadata for artifact relationship with a layer 
class LocationRel(StructuredRel):
    # array of m number of motifs and their counts each
    motifs = ArrayProperty(IntegerProperty(default = 0))

class Artifact(StructuredNode):
    uid = UniqueIdProperty()
    kind = StringProperty(unique_index=True, required=True) 
    location = RelationshipTo('Layer', 'FOUND', model= LocationRel, cardinality=OneOrMore)

# metadata for relationships between layers  
class SimilarityRel(StructuredRel):
    kind = StringProperty(unique_index=True, required=True)
    coefficient = FloatProperty(required=True)
     # mark the relationship with the artifact(s) used to calculate the coefficient
    artifacts = ArrayProperty(Artifact, required=True)

class Layer(StructuredNode):
    uid = UniqueIdProperty()
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

    # directionless relationship
    similarity = Relationship('Layer', 'SIMILAR_TO', model=SimilarityRel) # one similarity between each layer node pair per artifact type 

