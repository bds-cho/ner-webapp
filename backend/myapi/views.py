from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

from .models import UserData
from .serializers import UserDataSerializer

from rest_framework.response import Response
########################################################

def index(request):
    res = {
        "hello": "world"
    }
    return JsonResponse(res)

########################################################

@csrf_exempt
def loginUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract username, password, and any other data from the request
        email = data.get('email')
        password = data.get('password')
    
        # Perform user registration logic here
        user = authenticate(username=email, password=password)
        if user is not None:
            login(request, user)
            response_string = f"User with email {email} logged in successfully"
            return JsonResponse({'message': response_string}, status=200)
        else:
            response_string = f"User with email {email}: wrong credentials"
            return JsonResponse({'message': response_string}, status=400)
        
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
def registerUser(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract username, password, and any other data from the request
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        surname = data.get('surname')
       
        # Perform user registration logic here
        if User.objects.filter(username=email).exists():
            response_string = f"User with email {email} already exists"
            return JsonResponse({'message': response_string}, status=400)
        else:
            user = User.objects.create_user(username=email, password=password, first_name=name, last_name=surname)
            response_string = f"User with email {email} created successfully"
            return JsonResponse({'message': response_string}, status=201)

    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True, 'username': request.user.username, 'first_name': request.user.first_name, 'last_name': request.user.last_name})

@csrf_exempt
def logoutUser(request):
    if request.user.is_authenticated:
        logout(request)
        return JsonResponse({'message': 'User logged out successfully'}, status=200)
    else:
        return JsonResponse({'error': 'User is not logged in'}, status=400)

#########################################################

@csrf_exempt
def add_data(request):
    if request.method == 'POST':
        data = json.loads(request.body)  # Parse JSON data from request body
        serializer = UserDataSerializer(data=data)
        if serializer.is_valid():
            user_data = serializer.save(user=request.user)
            return JsonResponse({'id': user_data.id}, status=201)
        return JsonResponse(serializer.errors, status=400)

    return JsonResponse({'error': 'Only POST method is allowed'}, status=405)

@csrf_exempt
def get_user_data_all(request):
    if request.method == 'GET':
        user_data = UserData.objects.filter(user=request.user)
        serializer = UserDataSerializer(user_data, many=True)
        
        # test_object = {
        #     "text": "test text",
        #     "is_public": True,
        # }
        # json_response = json.dumps(test_object, indent=4)
        # return JsonResponse(json.dumps(test_object))
        # return HttpResponse(json.dumps(test_object))
        # return JsonResponse(test_object, safe=False, content_type="application/json")

        return JsonResponse(serializer.data, safe=False, content_type="application/json")  # safe=False for lists
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_user_data_public(request):
    if request.method == 'GET':
        user_data = UserData.objects.filter(user=request.user, is_public=True)
        serializer = UserDataSerializer(user_data, many=True)
        return JsonResponse(serializer.data, safe=False)  # safe=False for lists
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_user_data_private(request):
    if request.method == 'GET':
        user_data = UserData.objects.filter(user=request.user, is_public=False)
        serializer = UserDataSerializer(user_data, many=True)
        return JsonResponse(serializer.data, safe=False)  # safe=False for lists
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)

@csrf_exempt
def get_public_data_all(request):
    if request.method == 'GET':
        public_data = UserData.objects.filter(is_public=True)
        serializer = UserDataSerializer(public_data, many=True)
        return JsonResponse(serializer.data, safe=False)  # safe=False for lists
    else:
        return JsonResponse({'error': 'Only GET method is allowed'}, status=405)
