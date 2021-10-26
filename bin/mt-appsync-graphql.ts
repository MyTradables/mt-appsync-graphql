#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import MtAppsyncGraphqlStack from '../lib/mt-appsync-graphql-stack';

// importing configuration based on environment
import environmentConfig from './stack-config';

const app = new cdk.App();

// injecting configurations into stack based on environment.
new MtAppsyncGraphqlStack(app, 'mt-appsync-graphql', environmentConfig);
