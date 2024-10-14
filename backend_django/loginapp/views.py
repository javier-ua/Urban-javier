from django.shortcuts import render
from loginapp.models import Usuario
from rest_framework import generics
from .models import Usuario
from .serializers import UsuarioSerializer

# Create your views here.

class ListaUsuarios(generics.ListAPIView):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer


