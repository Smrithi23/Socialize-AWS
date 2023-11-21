import json 
import boto3
import time
from decimal import Decimal
from datetime import datetime

import uuid

def lambda_handler(event,context): 
    dynamodb = boto3.resource('dynamodb')
    
    # table name 
    table = dynamodb.Table('activity-details')
    
    print(event)
    
    # event = json.loads(event)
    
    if not event["title"]:
        return {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Title missing"})
        'body': {"message": "Title missing"}
        }
        
    if not event["description"]:
        return {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Description missing"})
        'body': {"message": "Description missing"}
        }
        
    if not event["date"]:
        response = {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Date missing"})
        'body': {"message": "Date missing"}
        }
        
    if not event["time"]:
        return {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Time missing"})
        'body': {"message": "Time missing"}
        }
        
    if not event["location"]:
        return {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Location missing"})
        'body': {"message": "Location missing"}
        }
        
    if not event["category"]:
        return {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Category missing"})
        'body': {"message": "Category missing"}
        }
        
        
    
    activity_id=str(uuid.uuid4())
    creator_id = event["creator_id"]
    title = event["title"]
    description = event["description"]
    date = event["date"]
    time = event["time"]
    location = event["location"]
    category = event["category"]
    
    if category != "Meetup" and category != "Event" and category != "Study Group":
        return {
        'statusCode': 400,
        # 'body': json.dumps({"message": "Invalid category"})
        'body': {"message": "Invalid category"}
        }
    
    
    # example date string '09/19/22 13:55:26'
    date_str = str(date) + " " + str(time)
    datetime_object = datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
    datetime_str = str(datetime_object)
    timestamp = int(datetime.timestamp(datetime_object))
    attendees = []
    
    curr_timestamp = datetime.now().timestamp()
    if timestamp <= curr_timestamp:
        return {
            'statusCode': 400,
            # 'body': json.dumps({"message": "Date and time must be in the future"})
            'body': {"message": "Date and time must be in the future"}
        }
    
    # inserting values into table
    item = {
        'creator_id': creator_id,
        'activity_id': activity_id,
        'title': title,
        'description': description,
        'datetime': datetime_str,
        'timestamp': timestamp,
        'location': location,
        'attendees': attendees,
        'category': category
    }
    
    print(item)

    table.put_item(
      Item=item
    )
    
    response = {
        'statusCode': 200,
        # 'body': json.dumps({"message": category + " successfully created"})
        'body': {"message": category + " successfully created"}
    }
    return response