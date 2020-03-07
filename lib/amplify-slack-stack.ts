import * as cdk from '@aws-cdk/core'
import * as lambda from '@aws-cdk/aws-lambda'

import sns = require('@aws-cdk/aws-sns')
import subs = require('@aws-cdk/aws-sns-subscriptions')

export class AmplifySlackStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const topic = sns.Topic.fromTopicArn(
      this,
      process.env.AMPLIFY_SNS_ID || '',
      process.env.AMPLIFY_SNS_ARN || '',
    )

    // The code that defines your stack goes here
    const myFunction = new lambda.Function(this, 'amplify-2020-03-02-slack', {
      functionName: 'amplify-2020-03-02-slack',
      runtime: lambda.Runtime.NODEJS_10_X,
      handler: 'index.handler',
      code: new lambda.AssetCode('src/lambda/amplify'),
    })

    topic.addSubscription(new subs.LambdaSubscription(myFunction))
  }
}
