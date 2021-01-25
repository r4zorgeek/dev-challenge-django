from django.http import JsonResponse, HttpResponseBadRequest
from django.views.decorators.http import require_POST
from django.views.decorators.csrf import csrf_exempt
import json

@require_POST
@csrf_exempt
def interest_data(request):
    request_json = json.loads(request.body.decode())
    savings_amount = 5000
    monthly_deposit = 10
    try:
        savings_amount = int(request_json['savings-amount'])
        monthly_deposit = int(request_json['monthly-deposit'])    
    except:
        return HttpResponseBadRequest()
    
    interest_rate = round(int(request_json['interest-rate']) / 100, 2)
    compound_interest_yearly = []
    
    for year in range(0, 51):
        r = (((1 + interest_rate) ** (year)))
        compound_interest_yearly.append(round((monthly_deposit * ((r-1)/interest_rate)) + (savings_amount * r), 2))
        # compound_interest_yearly[year] = savings_amount
        
        response_result = {'compound_data_yearly': compound_interest_yearly}
        
    return JsonResponse(response_result)