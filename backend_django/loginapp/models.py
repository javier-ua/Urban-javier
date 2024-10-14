from django.db import models

# Create your models here.

class Usuario(models.Model):
    ROLES = [
        ('Gestor', 'Gestor territorial'),
        ('Director', 'Director'),
        ('Ciudadano', 'Ciudadano'),
        ('Admin', 'Administrador'),
    ]

    rut = models.CharField(max_length=12, unique=True)
    nombre = models.CharField(max_length=100)
    password = models.CharField(max_length=100)  # Considera usar un sistema de hash para contraseñas
    rol = models.CharField(max_length=20, choices=ROLES, default='Ciudadano')

    class Meta:
        db_table = 'usuarios'  # Aquí defines el nuevo nombre de la tabla

    def __str__(self):
        return self.nombre