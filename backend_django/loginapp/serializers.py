from rest_framework import serializers
from loginapp.models import Usuarios, Roles

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = ['id', 'rut', 'nombre', 'email' , 'password', 'rol']

class RolesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Roles
        fields = ['rol', 'ver', 'editar', 'crear', 'eliminar']