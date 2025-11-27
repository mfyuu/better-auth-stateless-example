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
			// サーバーサイドで認証させるならtrueにする
			generateSecret: true,
			authFlows: {
				userPassword: true,
				userSrp: true,
			},
			oAuth: {
				flows: {
					authorizationCodeGrant: true,
				},
				scopes: [
					cognito.OAuthScope.OPENID,
					cognito.OAuthScope.PROFILE,
					cognito.OAuthScope.EMAIL,
				],
				callbackUrls: ["http://localhost:3000/api/auth/callback/cognito"],
				logoutUrls: ["http://localhost:3000/"],
			},
		});

		const domainPrefix = `${cdk.Stack.of(this).stackName.toLowerCase()}-auth`;
		const userPoolDomain = new cognito.UserPoolDomain(
			this,
			"apiUserPoolDomain",
			{
				userPool,
				cognitoDomain: {
					domainPrefix,
				},
			},
		);

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

		new cdk.CfnOutput(this, "cognitoDomain", {
			value: userPoolDomain.baseUrl(),
		});
	}
}
