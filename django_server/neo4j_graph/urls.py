from django.conf.urls import url
from neo4j_graph import views

urlpatterns = [
    url(r'^layer/$', views.layer_list.as_view()),
    url(r'^layer_view/$', views.layer_list.as_view()),

    url(r'^layer/(?P<pk>[0-9]+)$', views.layer_detail),
    url(r'^layer_view/(?P<pk>[0-9]+)$', views.layer_detail.as_view()),

    url(r'^artifact/$', views.artifact_list),
    url(r'^artifact_view/$', views.artifact_list.as_view()),

    url(r'^artifact/(?P<pk>[0-9]+)$', views.artifact_detail),
    url(r'^artifact_view/(?P<pk>[0-9]+)$', views.artifact_detail.as_view()),
]
