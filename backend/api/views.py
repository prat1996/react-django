from .models import Insurance
from .serializer import InsuranceSerializer
from rest_framework import generics, status
from rest_framework.response import Response
from django.db.models import Q
import pandas as pd 
import pytz
from timestring import Date


class GetInsurance(generics.GenericAPIView):
    def get(self,request):
        '''
            This method for get all the policy list and 
            we can also search through this method
        '''

        insurance_list=Insurance.objects.all()
        search_key = request.GET.get('search')
        if search_key:
            insurance_list=insurance_list.filter(Q(policy_id__contains=search_key)| 
                                                Q(customer_id__contains=search_key)
                                )
            serializer_class = InsuranceSerializer(insurance_list, many=True).data
            return Response(serializer_class, status=status.HTTP_200_OK)
        serializer_class = InsuranceSerializer(insurance_list, many=True).data
        return Response(serializer_class, status=status.HTTP_200_OK)
    
    def put(self, request):
        '''
        This method is used for updating the details of the poslicy
        '''
        insurance=Insurance.objects.get(pk=int(request.data['id']))
        serializer = InsuranceSerializer(insurance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"msg":"Insurance Updated Successfully",'status' :status.HTTP_200_OK})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self,request):
        '''
         this method is used to load the data from
         csv into the database. Here we use bulk 
         create method 
        
        '''

        data = pd.read_csv("./data.csv",sep=',') 
        row_iter = data.iterrows()
        
        objs = [
            Insurance(
                policy_id                   =  row['Policy_id'],
                customer_id                 =  row['Customer_id'],
                fuel                        =  row['Fuel'],
                veichel_segment             =  row['VEHICLE_SEGMENT'],
                premium                     =  row['Premium'],
                bodily_injury_liability     =  row['bodily injury liability'],
                personal_injury_protection  =  row['personal injury protection'],
                property_damage_liability   =  row['property damage liability'],
                collision                   =  row['collision'],
                comprehensive               =  row['comprehensive'],
                customer_gender             =  row['Customer_Gender'],
                customer_income_group       =  row['Customer_Income group'],
                customer_region             =  row['Customer_Region'],
                customer_marital_status     =  row['Customer_Marital_status'],
                date_of_purchase            =  self.to_python(str(row['Date of Purchase']))
            )
            for index, row in row_iter

        ]
        try:
            Insurance.objects.bulk_create(objs)
            return Response({"msg":"Insurance details updated successfully",'status' :status.HTTP_200_OK})
        except Exception as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    def to_python(self, value):
        '''
            This method is used for converting the string format 
            date to date time zone based
        '''
        if not value:
            return None
        parsed_date = Date(value, tz=pytz.utc)
        return parsed_date.date


class InsuranceAnalysis(generics.GenericAPIView):
    def get(self,request):
        '''
            This method is to extrat the detail based on date
            and region. This api is particularly for bar graph
        '''

        months=[]
        insurance_list=Insurance.objects.all()
        search_key = request.GET.get('search')
        if search_key != 'All':
            insurance_list=insurance_list.filter(customer_region=search_key)

        for insurance in insurance_list:
            months.append(int(insurance.date_of_purchase.month))
        result=self.map_count_to_months(months)
        return Response(result, status=status.HTTP_200_OK)

    def map_count_to_months(self,months):
        '''
          map_count_to_months(arg)-> This function is used to map the
          count to months and returns the list of dictionary
          map with months and its count
        '''
        result={
            'Jan':months.count(1),
            'Feb':months.count(2),
            'Mar':months.count(3),
            'Apr':months.count(4),
            'May':months.count(5),
            'June':months.count(6),
            'July':months.count(7),
            'Aug':months.count(8),
            'Sept':months.count(9),
            'Oct':months.count(10),
            'Nov':months.count(11),
            'Dec':months.count(12)
            }
        return result
