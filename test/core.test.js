import { test } from 'node:test';
import assert from 'node:assert/strict';
import { translateWord, translateSentence } from '../src/index.js';

test('vowel-initial word appends yay', () => {
  assert.equal(translateWord('apple'), 'appleyay');
  assert.equal(translateWord('egg'), 'eggyay');
});

test('single consonant moves to end', () => {
  assert.equal(translateWord('hello'), 'ellohay');
  assert.equal(translateWord('pig'), 'igpay');
});

test('consonant cluster moves together', () => {
  assert.equal(translateWord('string'), 'ingstray');
  assert.equal(translateWord('glove'), 'oveglay');
  assert.equal(translateWord('trash'), 'ashtray');
});

test('y as vowel after consonant', () => {
  assert.equal(translateWord('rhythm'), 'ythmrhay');
  assert.equal(translateWord('my'), 'ymay');
});

test('leading y is consonant', () => {
  assert.equal(translateWord('yellow'), 'ellowyay');
});

test('case is preserved on the body', () => {
  assert.equal(translateWord('Hello'), 'elloHay');
  assert.equal(translateWord('HELLO'), 'ELLOHay');
});

test('all-consonant word still appends ay', () => {
  assert.equal(translateWord('tsk'), 'tskay');
});

test('empty string returns empty', () => {
  assert.equal(translateWord(''), '');
});

test('non-alphabetic word passes through', () => {
  assert.equal(translateWord("don't"), "don't");
  assert.equal(translateWord('123'), '123');
});

test('non-string input passes through', () => {
  assert.equal(translateWord(null), null);
});

test('sentence preserves punctuation and whitespace', () => {
  assert.equal(translateSentence('hello, world!'), 'ellohay, orldway!');
});

test('sentence preserves multiple spaces', () => {
  assert.equal(translateSentence('hello   world'), 'ellohay   orldway');
});

test('sentence preserves newlines', () => {
  assert.equal(translateSentence('hello\nworld'), 'ellohay\norldway');
});

test('mixed case sentence translates token by token', () => {
  assert.equal(translateSentence('Apple String'), 'Appleyay ingStray');
});
