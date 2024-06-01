import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from "@solidjs/testing-library";
import { isInDocument, hasStyle } from "solid-dom-testing";

import Login from "./login";

const test = suite<ReturnType<typeof render>>("<Login />");

test.before.each((context) => {
	const returnValue = render(() => <Login />);
	Object.getOwnPropertyNames(returnValue).forEach((name) => {
		// @ts-expect-error
		context[name] = returnValue[name];
	});
});

test.after.each(({ unmount }) => unmount());

test("form render email input", ({ getByLabelText }) => {
	assert.ok(isInDocument(getByLabelText("Email address")));
});

test("form render password input", ({ getByLabelText }) => {
	assert.ok(isInDocument(getByLabelText("Password")));
});

test("form render sign in button", ({ getByText }) => {
	assert.ok(isInDocument(getByText("Sign in")));
});

test.run();
