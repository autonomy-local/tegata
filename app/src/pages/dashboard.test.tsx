import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from '@solidjs/testing-library';
import { isInDocument, hasStyle } from 'solid-dom-testing';

import Dashboard from './dashboard';

const test = suite<ReturnType<typeof render>>('<Dashboard />');

test.before.each((context) => {
  const returnValue = render(() => <Dashboard />);
  Object.getOwnPropertyNames(returnValue).forEach((name) => {
    // @ts-expect-error
    context[name] = returnValue[name];
  });
});

test.after.each(({ unmount }) => unmount());

test('page render dashboard title', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Dashboard')));
});

test('page render dashboard message', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Welcome to your dashboard!')));
});

test('page render dashboard message', ({ getByText }) => {
  assert.ok(isInDocument(getByText('You have successfully logged in.')));
});

test.run();