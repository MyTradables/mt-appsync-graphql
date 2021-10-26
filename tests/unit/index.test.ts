import handler from '../../src';

describe('Testing Lambda handler', () => {
  it('should return event string', async () => {
    const result = await handler('foobar');
    expect(result).toStrictEqual('foobar');
  });
});