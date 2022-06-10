#!/bin/bash

#npm install -g npm-cli-login
npm-cli-login -u jenkins -p jenkins1234\!1 -e developers@coontec.com -r https://maven.meback.ai/repository/npm-private/

npm install --registry https://maven.meback.ai/repository/npm-group/

cd packages/survey-creator
rm -rf build
npm install --registry https://maven.meback.ai/repository/npm-group/
npm run build
cd build
npm publish --registry https://maven.meback.ai/repository/npm-private/

cd ../../survey-creator-core
rm -rf build
npm install --registry https://maven.meback.ai/repository/npm-group/
npm run build
cd build
npm publish --registry https://maven.meback.ai/repository/npm-private/

cd ../../survey-creator-knockout
rm -rf build
npm install --registry https://maven.meback.ai/repository/npm-group/
npm run build
cd build
npm publish --registry https://maven.meback.ai/repository/npm-private/

cd ../../survey-creator-react
rm -rf build
npm install --registry https://maven.meback.ai/repository/npm-group/
npm run build
cd build
npm publish --registry https://maven.meback.ai/repository/npm-private/