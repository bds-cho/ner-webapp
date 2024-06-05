from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt

def index(request):
    res = {
        "hello": "world"
    }
    return JsonResponse(res)

@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract username, password, and any other data from the request
        email = data.get('email')
        password = data.get('password')
    
        # Perform user registration logic here
        
        # Return JSON response
        response_string = f"User with the email {email} registered successfully"
        return JsonResponse({'message': response_string}, status=201)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)
    
@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # Extract username, password, and any other data from the request
        email = data.get('email')
        password = data.get('password')
        name = data.get('name')
        surname = data.get('surname')
       
        # Perform user registration logic here
        
        # Return JSON response
        response_string = f"User {name} {surname} with the email {email} registered successfully"
        return JsonResponse({'message': response_string}, status=201)
    else:
        return JsonResponse({'error': 'Only POST requests are allowed'}, status=405)