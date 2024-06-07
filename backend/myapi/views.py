from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User

def index(request):
    res = {
        "hello": "world"
    }
    return JsonResponse(res)

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

    return JsonResponse({'isAuthenticated': True, 'username': request.user.username})