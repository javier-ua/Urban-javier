from django.db import models
from django.core.exceptions import ValidationError

# Create your models here.
class Roles(models.Model):
    ROLES = [
        ('Gestor', 'Gestor territorial'),
        ('Director', 'Director'),
        ('Ciudadano', 'Ciudadano'),
        ('Admin', 'Administrador')
    ]

    rol = models.CharField(max_length=20, choices=ROLES, primary_key=True)
    ver = models.BooleanField(default=False)
    editar = models.BooleanField(default=False)
    crear = models.BooleanField(default=False)
    eliminar = models.BooleanField(default=False)

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return self.rol

class Usuarios(models.Model):
    rut = models.CharField(max_length=12, unique=True)
    nombre = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, unique=True)
    password = models.CharField(max_length=100)  
    rol = models.ForeignKey(Roles, on_delete=models.PROTECT, related_name='usuariosDelRol')

    class Meta:
        db_table = 'usuarios'

    def __str__(self):
        return self.nombre
