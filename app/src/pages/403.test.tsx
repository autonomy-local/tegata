import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from '@solidjs/testing-library';
import { isInDocument, hasStyle } from 'solid-dom-testing';

import Page403 from "./403";

const test = suite<ReturnType<typeof render>>('<Page403 />');

test.before.each((context) => {
  const returnValue = render(() => <Page403 />);
  Object.getOwnPropertyNames(returnValue).forEach((name) => {
    // @ts-expect-error
    context[name] = returnValue[name];
  });
});

test.after.each(({ unmount }) => unmount());

test('page render 403 title', ({ getByText }) => {
  assert.ok(isInDocument(getByText('403 Forbidden')));
});

test('page render 403 message', ({ getByText }) => {
  assert.ok(isInDocument(getByText('You are not allowed to access this page.')));
});

test('page render 403 contact message', ({ getByText }) => {
  assert.ok(isInDocument(getByText('Please contact the administrator.')));
});

test.run();