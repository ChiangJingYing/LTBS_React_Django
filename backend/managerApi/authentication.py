import jwt, datetime
from .models import Managers
from rest_framework import exceptions
from rest_framework.permissions import BasePermission
from rest_framework.exceptions import AuthenticationFailed
from jwt import exceptions


class ManagerPermission(BasePermission):
    def has_permission(self, request, view):
        token = request.META["HTTP_AUTHORIZATION"].replace("Bearer ",'')
        user_id = TokenProccess.decode_access_token(token)
        return True


class TokenProccess():
    def create_access_token(user: Managers):
        return jwt.encode({
            'user_id': user.id,
            'rule': 'manager',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(seconds=10),
            'iat': datetime.datetime.utcnow()
        }, 'access_secret', algorithm='HS256')


    def decode_access_token(token):
        try:
            payload = jwt.decode(token, 'access_secret', algorithms='HS256')
            info = {
                'user_id': payload['user_id'],
                'rule': payload['rule']
            }
            return info
        except exceptions.ExpiredSignatureError:
                raise AuthenticationFailed("token timeout")
        except:
            raise AuthenticationFailed('unauthenticated')


    def create_refresh_token(user: Managers):
        return jwt.encode({
            'user_id': user.id,
            'rule': 'manager',
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }, 'refresh_secret', algorithm='HS256')


    def decode_refresh_token(token):
        try:
            payload = jwt.decode(token, 'refresh_secret', algorithms='HS256')
            info = {    
                'user_id': payload['user_id'],
                'rule': payload['rule']
            }
            return info
        except:
            raise AuthenticationFailed('unauthenticated')
