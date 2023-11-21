import json
import boto3
from boto3.dynamodb.conditions import Key
from decimal import Decimal

def lambda_handler(event, context):
    print(event)
    # activity_id = '7d95d241-c1aa-4486-a368-1c2b679ad6e7'
    
    activity_id = event["activity_id"]
    
    
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('activity-details')
    
    QueryItem = table.query(
        KeyConditionExpression=Key('activity_id').eq(activity_id)
    )
    
    response = {
        'statusCode': 200,
        # 'body': json.dumps(QueryItem, default=decimal_default)
        'body': QueryItem["Items"][0]
        
    }
    
    return response

def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type {} is not JSON serializable".format(type(obj)))