import * as cdk from "aws-cdk-lib";
import * as apigw from "aws-cdk-lib/aws-apigateway";
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

		new apigw.LambdaRestApi(this, "hono-on-aws-lambda", {
			handler: fn,
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
