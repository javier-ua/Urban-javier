"""
URL configuration for backend_django project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from loginapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('usuarios/', views.ListaCreaUsuarios.as_view(), name='lista_usuarios'), #localhost:8000/usuarios para crear y mostrar usuarios
    path('usuarios/<int:pk>/', views.RUDUsuario.as_view(), name='detalle_usuario'), #localhost:8000/usuarios/<ID del user a modificar>
    path('roles/', views.ListaCreaRoles.as_view(), name='lista_roles'), # localhost:8000/roles para crear y mostrar roles
    path('roles/<str:rol>/', views.RUDRoles.as_view(), name='detalle_rol'), # localhost:8000/roles/<ID del rol a modificar>
]
