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
    compound_interest_yearly = [savings_amount]
    
    for year in range(1, 51):
        # formula src : https://www.thecalculatorsite.com/articles/finance/compound-interest-formula.php
        r = (1 + (interest_rate/12)) ** (12 * year)
        compound_interest_pnc = savings_amount * r
        future_value = monthly_deposit * ((r - 1) / (interest_rate/12))
        compound_interest_yearly.append(round(compound_interest_pnc + future_value, 2)) 
        
    response_result = {'compound_data_yearly': compound_interest_yearly}
        
    return JsonResponse(response_result)