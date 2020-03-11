import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert'
import * as cdk from '@aws-cdk/core'
import HelloCdk = require('../lib/amplify-slack-stack')

test('Empty Stack', () => {
  const app = new cdk.App()
  // WHEN
  const stack = new HelloCdk.AmplifySlackStack(app, 'MyTestStack')
  // THEN
  expectCDK(stack).to(
    matchTemplate(
      {
        Resources: {},
      },
      MatchStyle.EXACT,
    ),
  )
})
