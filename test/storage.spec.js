/* global define, it, describe, before, afterEach, beforeEach, sinon */
import assert from 'assert';

import { Storage } from '../src/helpers/storage.js';

describe('helpers/Storage', () => {
  const storage = new Storage();

  it('should put the data by a key', () => {
    storage.put('test', 123);
    assert.equal(storage.find('test'), 123);
  });

  it('should put a object literal', () => {
    storage.put('test2', { name: 'John' });
    assert.equal(storage.find('test2').name, 'John');
  });

  it('should remove by a key', () => {
    storage.remove('test2');
    assert.equal(storage.find('test2'), null);
  });

  it('should be true when key exists', () => {
    assert(storage.has('test'));
  });

  it('should be false when key don\'t exists', () => {
    assert(!storage.has('test2'));
  });

  it('should clear storage', () => {
    storage.put('key1', {});
    storage.put('key2', { name: 'Ivan' });

    storage.clear();

    assert(!storage.has('key1'));
    assert(!storage.has('key2'));
  });

  it('should be in one instance', () => {
    storage.put('name', 'John');

    const storage2 = new Storage();

    assert.equal(storage2.find('name'), 'John');
    assert.strictEqual(storage, storage2);
  });
});
