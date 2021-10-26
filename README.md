# MyTradables: Amazon Web Services Cloud Development Kit Bootstrap

This repository contains a AWS CDK template stack for MyTradables internal use.

This template stack is build on top of aws cdk typescript.
Github actions workflows have been added for ci/cd.
ESLint has been added for code linting.
Jest unit tests for code and cdk infastructure have been added.
Webpack has been added for compressing code.
Husky commitlint has been added for formatting commits.

## Before use:
* `Configure stack`     bin/* lib/* package.json
* `Configure Jest`      jest.config.ts & *.spec.ts
* `Configure ESLint`    .eslintrc.json & package.json
* `Configure pipeline`  .github/workflows/*
* `Configure webpack`   webpack.config.js
* `Configure husky`     .husky/

## Stack dependencies
* `AWS CDK`             AWS cloud development kit
* `Node.js`             Javascript and Typescript
* `ESLint`              Node bases linter
* `Github Actions`      Workflow pipelines   
* `Webpack`             Workflow pipelines   
* `Husky`               Husky commit-message hook. Allowed prefix for commit message: `['build','chore','ci','docs','feat','fix','perf','refactor','revert','style','test'];`

## Content:
* `bin/`                contains AWS configurations and environment variables
* `lib/`                contains AWS stack compoments
* `src/`                contains business logic
* `tests/unit`          contains tests for business logic
* `tests/cdk/`          contains tests for CDK constructs
* `.github/workflows/`  contains pipelines for all environment
* `.jest/`              contains environment variables for jest testing
* `cdk.json`            contains CDK configuration
* `.eslintrc`           contains ESLint configuration
* `.eslintignore`       contains files and folders ESLint will ignore while checking
* `jest.config.ts/`     contains configuration for jest testing
* `webpack.config.js`   contains configuration for webpack
* `.husky`              contains configuration for husky

## Useful commands
* `npm run build`   compile typescript to js
* `npm run test`    perform the jest unit tests
* `cdk deploy`      deploy this stack to your default AWS account/region
* `cdk diff`        compare deployed stack with current state
* `cdk synth`       emits the synthesized CloudFormation template
