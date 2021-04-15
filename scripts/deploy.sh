echo "Processing deploy.sh"
# Set EB BUCKET as env variable
EB_BUCKET=elasticbeanstalk-us-east-1-027857029556
# Set the default region for aws cli
aws configure set default.region us-east-1
# Log in to ECR
eval $(aws ecr get-login --no-include-email --region us-east-1)
# Build docker image based on our production Dockerfile
docker build -t johnli7/lexiql .
# tag the image with the Travis-CI SHA
docker tag johnli7/lexiql:latest 027857029556.dkr.ecr.us-east-1.amazonaws.com/lexiql:$TRAVIS_COMMIT
# Push built image to ECS
docker push 027857029556.dkr.ecr.us-east-1.amazonaws.com/lexiql:$TRAVIS_COMMIT
# Use the linux sed command to replace the text '<VERSION>' in our Dockerrun file with the Travis-CI SHA key
sed -i='' "s/<VERSION>/$TRAVIS_COMMIT/" Dockerrun.aws.json
# Zip up our codebase, along with modified Dockerrun and our .ebextensions directory
zip -r lexiql-prod-deploy.zip Dockerrun.aws.json .ebextensions
# Upload zip file to s3 bucket
aws s3 cp lexiql-prod-deploy.zip s3://$EB_BUCKET/lexiql-prod-deploy.zip
# Create a new application version with new Dockerrun
aws elasticbeanstalk create-application-version --application-name LexiQL --version-label $TRAVIS_COMMIT --source-bundle S3Bucket=$EB_BUCKET,S3Key=lexiql-prod-deploy.zip
# Update environment to use new version number
aws elasticbeanstalk update-environment --environment-name Lexiql-env-1 --version-label $TRAVIS_COMMIT