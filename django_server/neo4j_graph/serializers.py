from rest_framework import serializers
from .models import Layer, Artifact

class LayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Layer
        fields = ('name','lat', 'lon', 'elev', 'age', 'similarity') # include pk ? 
        depth = 1

class ArtifactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artifact
        fields = ('kind','location')
        depth = 1