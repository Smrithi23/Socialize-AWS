import json
import boto3

def lambda_handler(event, context):
    user_data = json.loads(event['body'])

    dynamodb = boto3.resource('dynamodb')

    table_name = 'profile-details'

    table = dynamodb.Table(table_name)

    user_item = {
        'name': user_data['name'],
        'uni': user_data['uni'],
        'emailId': user_data['emailId'],
        'location': user_data['location'],
        'phoneno': user_data['phoneno'],
        'interest': user_data['interest']
    }

    table.put_item(Item=user_item)

    response = {
        'statusCode': 200,
        'body': json.dumps('User created successfully!')
    }

    return response