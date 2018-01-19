from django.shortcuts import render
from .models import Layer, Artifact
from django.views.generic import TemplateView

def get_layers(request):
    return render('yourapp/books.html', request, {'layers': Layer.nodes})

def get_artifacts(request):
    return render('yourapp/books.html', request, {'artifacts': Artifact.nodes})
 
# Create your views here.
class HomePageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'index.html', context=None)
 
class LinksPageView(TemplateView):
    def get(self, request, **kwargs):
        return render(request, 'links.html', context=None)