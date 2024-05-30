from django.http import JsonResponse

def index(request):
    res = {
        "hello": "world"
    }
    return JsonResponse(res)