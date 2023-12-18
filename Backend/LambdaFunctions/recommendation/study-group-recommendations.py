import json
import boto3
from boto3.dynamodb.conditions import Key

client = boto3.client('personalize-runtime')
dynamodb = boto3.resource('dynamodb')
table = dynamodb.Table('activity-details')

def lambda_handler(event, context):
    # TODO implement
    # user_id = 'sp4135'
    user_id = event['user_id']
    id_mapping = {
     'mc5470': '20738801',
     'sp4135': '225139423',
     'sd3596': '7137746',
     'vk2497': '7333165',
     'vm8901': '9918706'
    }
    
    response = client.get_recommendations(
        campaignArn='arn:aws:personalize:us-east-1:252225289072:campaign/campaign-1',
        filterArn='arn:aws:personalize:us-east-1:252225289072:filter/filter-study-groups',
        userId=id_mapping[user_id],
        numResults=10)
        
    itemList = response['itemList']
    reco_list = []
    
    for item in itemList:
        activity_id = item['itemId']
        QueryItem = table.query(
            KeyConditionExpression=Key('activity_id').eq(activity_id)
        )
        meetup = QueryItem['Items'][0]
        reco_list.append(meetup)
    
    return {
        'statusCode': 200,
        'body': reco_list
    }
