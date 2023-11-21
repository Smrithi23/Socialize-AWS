import json
import boto3
from opensearchpy import OpenSearch, RequestsHttpConnection
from requests_aws4auth import AWS4Auth
from botocore.exceptions import ClientError
import datetime
from boto3.dynamodb.conditions import Key, Attr
from decimal import Decimal
from datetime import datetime

REGION = 'us-east-1'
HOST = 'search-socialize-2fti2w65mbul2p7of77x4y7awm.us-east-1.es.amazonaws.com'
INDEX = 'socialize'

def lambda_handler(event, context):
    
    print(event["user_id"])
    
    user_id = event["user_id"]
    
    result = query(user_id)
    print(result)
    
    if not result:
        return {
            'statusCode': 200,
            'body': []
        }
    
    current_meetup_ids = result['current_meetup_ids']
    current_event_ids = result['current_event_ids']
    current_study_groups = result['current_study_groups']
    #add polls later
    
    print(current_meetup_ids)
    print(current_event_ids)
    print(current_study_groups)
    
    activity_ids = []
    activity_ids.extend(current_meetup_ids)
    activity_ids.extend(current_event_ids)
    activity_ids.extend(current_study_groups)
    print(activity_ids)
    user_activity_details = fetch_activity_details(activity_ids)
   
   # Added by S
    t = []
    for _ in user_activity_details:
        t = t + _
        
    return {
        'statusCode': 200,
        'body': t
        #'body': json.dumps(user_activity_details, default=decimal_default)
    }

def query(user_id):
    
    
    client = OpenSearch(hosts=[{
        'host': HOST,
        'port': 443
    }],
        http_auth=get_awsauth(REGION, 'es'),
        use_ssl=True,
        verify_certs=True,
        connection_class=RequestsHttpConnection)
        
    if client.exists(index=INDEX, id=user_id):
        res = client.get(index=INDEX, id = user_id)
        return res['_source']
        
    else:
        return []

    
def get_awsauth(region, service):
    cred = boto3.Session().get_credentials()
    return AWS4Auth(cred.access_key,
                    cred.secret_key,
                    region,
                    service,
                    session_token=cred.token)

def insert(record, user_id):
    try:
        client = OpenSearch(hosts=[{
            'host': HOST,
            'port': 443
        }],
            http_auth=get_awsauth(REGION, 'es'),
            use_ssl=True,
            verify_certs=True,
            connection_class=RequestsHttpConnection)

        response = client.index(
            id = user_id,
            index=INDEX,
            body=record,
            refresh=True
        )

        print('\nAdding document:')
        print(response)

    except ClientError as e:
        print('Error', e.response['Error']['Message'])
        
        
def fetch_activity_details(activity_ids):
    
    print("activity ids", activity_ids)
    db = boto3.resource('dynamodb')
    table = db.Table('activity-details')
   
    try:
        activity_details = []
       
        current_datetime = datetime.now()
        current_timestamp = Decimal(current_datetime.timestamp())

        for id in activity_ids:
            print("id", id)
            
            item = table.query(
                KeyConditionExpression=Key('activity_id').eq(id) & Key('timestamp').gt(current_timestamp)
            )
            
            #add a check to only include events which are in the future
            print(item)
            if item['Items']:
                activity_details.append(item['Items'])
        
        print("activity details")
        print(activity_details)
        
        return activity_details
    
    except ClientError as e:
        print('Error', e.response['Error']['Message'])
        return None, None
 
    
def decimal_default(obj):
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError("Object of type {} is not JSON serializable".format(type(obj)))