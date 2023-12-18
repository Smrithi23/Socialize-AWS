import boto3
import json

def receive_message():
    sqs = boto3.client('sqs')
    response = sqs.receive_message(QueueUrl = 'emailVerification')
    message = response['Messages']
    data = None
    if len(message) > 0: 
        message = message[0]['Body']
        data = json.loads(message)
    return data
    
    
def send_email(uni, email):
    from_email = 'smrithi.prakash23@gmail.com'
    to_email = email
    
    link = f'https://main.d3ux64n7l5a7it.amplifyapp.com/createProfile?uni={uni}&email={email}'
    
    message = {
        'Subject' : {
            'Data' : 'Verify Email for Socialize'
        },
        'Body': {
            'Text' : { 'Data':f'Click on the link {link} to verify your account on socialize !' }
        }
    }
    ses = boto3.client('ses')
    response = ses.send_email(
        Source = from_email, 
        Destination = {'ToAddresses':[to_email]},
        Message = message)
    return response

def lambda_handler(event, context):
    # TODO implement
    
    data = receive_message()
    if data is not None : send_email(data['uni'], data['emailID'])
    
    return {
        'statusCode': 200,
        'body': json.dumps('Hello from Lambda!')
    }