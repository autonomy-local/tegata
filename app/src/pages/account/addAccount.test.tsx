import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from '@solidjs/testing-library';
import { isInDocument, hasStyle } from 'solid-dom-testing';

import AddAccount from './addAccount';

const test = suite<ReturnType<typeof render>>('<AddAccount />');

test.before.each((context) => {
  const returnValue = render(() => <AddAccount />);
  Object.getOwnPropertyNames(returnValue).forEach((name) => {
    // @ts-expect-error
    context[name] = returnValue[name];
  });
});

test.after.each(({ unmount }) => unmount());

test('form render name input', ({ getByLabelText }) => {
  assert.ok(isInDocument(getByLabelText('Name')));
});

test('form render email input', ({ getByLabelText }) => {
  assert.ok(isInDocument(getByLabelText('Email')));
});

test('form render role select', ({ getByLabelText }) => {
  assert.ok(isInDocument(getByLabelText('Role')));
});

test('form render add account button', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Register Account')));
});

test('form render reset button', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Reset')));
});

test.run();