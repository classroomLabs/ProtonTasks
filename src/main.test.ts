/* eslint-disable max-nested-callbacks */
import { init } from './main';

describe('main', () => {
  test('init existis', () => expect(init()).toEqual(true));
});
