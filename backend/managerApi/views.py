from django.http import JsonResponse
from django.views import View
import json
from rest_framework.views import APIView
from rest_framework.response import Response
from .authentication import *
from .serializers import *


# Create your views here.
class TokenObtainPairView(APIView):
    def post(self, request):
        post_data = json.loads(request.body)
        user = Managers.objects.filter(id=post_data['username']).first()
        if not user:
            return Response()
        if not user.check_password(password=post_data['password']):
            return Response()
        token = {
            'access': TokenProccess.create_access_token(user),
            'refresh': TokenProccess.create_refresh_token(user)
        }
        return Response(token)


class TokenRefreshPairView(APIView):
    def post(self, request):
        user_info = None
        token = json.loads(request.body).get('refresh', None)
        if token:
            user_info = TokenProccess.decode_refresh_token(token)
        if user_info and user_info['rule'] == 'manager':
            try:
                user = Managers.objects.filter(id=user_info['user_id']).first()
            except user.DoesNotExist:
                raise jwt.exceptions.InvalidAudienceError('user not exist')
            else:
                return Response({
                    'access': TokenProccess.create_access_token(user),
                    'refresh': TokenProccess.create_refresh_token(user)
                }
                )
        else:
            raise jwt.exceptions.InvalidAudienceError('permission denined')
                

            


class ManageUserApi(APIView):
    permission_classes = (ManagerPermission, )
    def get(self, request):
        username = request.GET.get('username', None)
        name = request.GET.get('name', None)

        data = None
        if not username and not name:
            data = User.objects.all()
        elif username:
            data = User.objects.filter(username=username)
        elif name:
            data = User.objects.filter(name=name)
        else:
            data = User.objects.filter(username=username).filter(name=name)
        data = UserSerializer(data, many=True)
        return Response(data.data)



class ManageDriverApi(View):
    def get(self, request):
        all_order = Driver.objects.all()
        all_order_serializer = DriverSerializer(all_order, many=True)

        return JsonResponse(all_order_serializer.data, safe=False)
