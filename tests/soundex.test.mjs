import { soundex } from '../src/soundex.mjs';

describe('Soundex', () => {

  test('Less than 4 characters is right-padded with zeros', () => {
    expect(soundex('test')).toBe('T230');
  });

  test('Exactly 4 characters is not padded or truncated', () => {
    expect(soundex('tests')).toBe('T232');
  });

  test('Over 4 characters is truncated', () => {
    expect(soundex('example')).toBe('E251');
  });

  test('Letter doubles are dropped ("tteesstt" is treated like "test")', () => {
    expect(soundex('tteesstt')).toBe('T230');
  });

  test('Similar words have the same value', () => {
    expect(soundex('bounce')).toBe('B520');
    expect(soundex('bownce')).toBe('B520');
  });

});