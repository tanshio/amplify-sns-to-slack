#!/usr/bin/env node
import 'source-map-support/register'
import * as cdk from '@aws-cdk/core'
import { AmplifySlackStack } from '../lib/amplify-slack-stack'

const app = new cdk.App()
new AmplifySlackStack(app, 'AmplifySlackStack')
