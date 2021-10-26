import { IMtAppsyncGraphqlStackProps } from './stack-environment-types';

const environmentConfig: IMtAppsyncGraphqlStackProps = {
  tags: {
    Developer: 'Faruk Ada',
    Application: 'MyTradables.com',
  },
  apikeyValidityInDays: 365,
  kmsKeyArn: 'arn:partition:service:region:account-id:resource-type:resource-id',
};
export default environmentConfig;
