from django.shortcuts import render
from loginapp.models import Usuarios, Roles
from rest_framework import generics
from .serializers import UsuarioSerializer, RolesSerializer

# Create your views here.

class ListaCreaUsuarios(generics.ListCreateAPIView): #para listar y crear
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

class RUDUsuario(generics.RetrieveUpdateDestroyAPIView): # para leer, actualizar y borrar
    queryset = Usuarios.objects.all()
    serializer_class = UsuarioSerializer

class ListaCreaRoles(generics.ListCreateAPIView): #para listar y crear roles
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

class RUDRoles(generics.RetrieveUpdateDestroyAPIView): # para actualizar permisos de roles
    queryset = Roles.objects.all()
    serializer_class = RolesSerializer

