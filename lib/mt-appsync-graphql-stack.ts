import * as cdk from '@aws-cdk/core';
import * as appsync from '@aws-cdk/aws-appsync';
import * as cognito from '@aws-cdk/aws-cognito';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as kms from '@aws-cdk/aws-kms';
import * as lambda from '@aws-cdk/aws-lambda';
import * as logs from '@aws-cdk/aws-logs';
import { IMtAppsyncGraphqlStackProps } from '../bin/stack-environment-types';

class MtAppsyncGraphqlStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props: IMtAppsyncGraphqlStackProps) {
    super(scope, id, props);

    /**
     * AWS Cognito Userpool.
     */
    const userPool = cognito.UserPool.fromUserPoolId(this, 'userpool', 'poolid');

    /**
     * AWS Appsync Graphql API.
     */
    const api = new appsync.GraphqlApi(this, 'mt-appsync-graphql-api', {
      name: 'mt-appsync-graphql-api',
      schema: appsync.Schema.fromAsset('./graphql/schema.graphql'),
      logConfig: {
        fieldLogLevel: appsync.FieldLogLevel.ALL,
      },
      authorizationConfig: {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.API_KEY,
          apiKeyConfig: {
            name: 'mt-appsync-graphql-apikey',
            description: 'Public apikey for mytradables.com',
            expires: cdk.Expiration.after(cdk.Duration.days(props.apikeyValidityInDays)),
          },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: {
              userPool,
            },
          },
        ],
      },
    });

    /**
     * AWS Lambda for resolving API calls.
     */
    const resolverLambda = new lambda.Function(this, 'mt-appsync-graphql-lambda', {
      functionName: 'mt-appsync-graphql-orchestrator',
      description: 'Lambda for processing api calls from mytradables.com',
      runtime: lambda.Runtime.NODEJS_14_X,
      code: lambda.Code.fromAsset('dist'),
      handler: 'index.handler',
      memorySize: 128,
      timeout: cdk.Duration.seconds(30),
      logRetention: logs.RetentionDays.ONE_WEEK,
    });
    
    /**
         * AWS KMS key import and grant lambda encrypt/decrypt rights.
         */
    const encryptionKey = kms.Key.fromKeyArn(
      this,
      'mt-kms-key',
      props.kmsKeyArn,
    );
    encryptionKey.grantEncryptDecrypt(resolverLambda);
    
    /**
         * AWS Dynamodb tables import and grant lambda read/write rights.
         */
    const categoryTable = dynamodb.Table.fromTableName(
      this,
      'test',
      'test',
    );
    categoryTable.grantReadWriteData(resolverLambda);
    
    /**
         * Add Lambda as data source and resolvers for api endpoints.
         */
    const resolverLambdaDataSource = api.addLambdaDataSource(
      'mt-appsync-graphql-lambda-data-source',
      resolverLambda,
    );
    
    resolverLambdaDataSource.createResolver({
      typeName: 'test',
      fieldName: 'test',
    });
  }
}

export default MtAppsyncGraphqlStack;
