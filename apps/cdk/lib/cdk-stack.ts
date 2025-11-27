import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
import * as cognito from "aws-cdk-lib/aws-cognito";
import * as lambda from "aws-cdk-lib/aws-lambda";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

export class CdkStack extends cdk.Stack {
	constructor(scope: Construct, id: string, props?: cdk.StackProps) {
		super(scope, id, props);

		const fn = new NodejsFunction(this, "lambda", {
			entry: "lambda/index.ts",
			handler: "handler",
			runtime: lambda.Runtime.NODEJS_22_X,
		});

		const userPool = new cognito.UserPool(this, "apiUserPool", {
			selfSignUpEnabled: true,
			signInAliases: { email: true },
		});

		new cognito.UserPoolClient(this, "apiUserPoolClient", {
			userPool,
			authFlows: {
				userPassword: true,
				userSrp: true,
			},
		});

		const authorizer = new apigw.CognitoUserPoolsAuthorizer(
			this,
			"apiAuthorizer",
			{
				cognitoUserPools: [userPool],
				identitySource: "method.request.header.Authorization",
			},
		);

		new apigw.LambdaRestApi(this, "hono-on-aws-lambda", {
			handler: fn,
			defaultMethodOptions: {
				authorizer,
				authorizationType: apigw.AuthorizationType.COGNITO,
			},
			deployOptions: {
				stageName: "dev",
			},
			defaultCorsPreflightOptions: {
				allowOrigins: apigw.Cors.ALL_ORIGINS,
				allowMethods: apigw.Cors.ALL_METHODS,
				allowHeaders: apigw.Cors.DEFAULT_HEADERS,
			},
		});
	}
}
