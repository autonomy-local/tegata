import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from '@solidjs/testing-library';
import { isInDocument, hasStyle } from 'solid-dom-testing';

import { Login } from './login';

const test = suite<ReturnType<typeof render>>('<Login />');

test.before.each((context) => {
  const returnValue = render(() => <Login />);
  Object.getOwnPropertyNames(returnValue).forEach((name) => {
    // @ts-expect-error
    context[name] = returnValue[name];
  });
});

test.after.each(({ unmount }) => unmount());

// test target: it will render an username input and a password input
test('it will render an username input and a password input', ({
  getByPlaceholderText,
}) => {
  assert.ok(isInDocument(getByPlaceholderText('Username')));
  assert.ok(isInDocument(getByPlaceholderText('******************')));
});

// test target: it will render an Sign In button
test('it will render an Sign In button', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Sign In')));
});

// test target: it will render an Forgot Password link
test('it will render an Forgot Password link', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Forgot Password?')));
});

test.run();