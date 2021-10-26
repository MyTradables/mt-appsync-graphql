import { SynthUtils } from '@aws-cdk/assert';
import { App } from '@aws-cdk/core';
import environmentConfig from '../../bin/stack-config';
import MtAppsyncGraphqlStack from '../../lib/mt-appsync-graphql-stack';

const app = new App();

function fixGeneratedCdkAssetName() {
  // CDK snapshot contains Lambda code as assets, and asset name is being regenerated every time, causing false negative test results
  // code below replaces regenerated part of assets name with "[HASH REMOVED]"
  expect.addSnapshotSerializer({
    test: (val) => typeof val === 'string' && val.match(/AssetParameters([A-Fa-f0-9]{64})(\w+)/) != null,
    print: () => '"AssetParameters-[HASH REMOVED]"',
  });

  expect.addSnapshotSerializer({
    test: (val) => typeof val === 'string' && val.match(/(\w+) for asset\s?(version)?\s?"([A-Fa-f0-9]{64})"/) != null,
    print: (val) => `"${(val as string).replace(/(\w+ for asset)\s?(version)?\s?"([A-Fa-f0-9]{64})"/, '$1 [HASH REMOVED]')}"`,
  });

  expect.addSnapshotSerializer({
    test: (val) => typeof val === 'number' && val > 1000000000,
    print: () => '[HASH REMOVED]',
  });
}

fixGeneratedCdkAssetName();

describe('Stack validation', () => {
  it('should have a correct stack configuration', () => {
    const stack = new MtAppsyncGraphqlStack(app, 'mt-appsync-graphql', environmentConfig);
    expect(SynthUtils.toCloudFormation(stack)).toMatchSnapshot();
  });
});