from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, User


class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "username", "email", "name", "isAdmin"]

    def get__id(self, instance):
        return instance.id

    def get_isAdmin(self, instance):
        return instance.is_staff

    def get_name(self, instance):
        name = instance.first_name + " " + instance.last_name
        if not name:
            name = instance.email
        return name


class UserSerializerWithToken(UserSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["_id", "username", "email", "name", "isAdmin", "token"]

    def get_token(self, instance):
        token = RefreshToken.for_user(instance)
        return str(token.access_token)


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
