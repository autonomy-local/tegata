import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from "@solidjs/testing-library";
import { isInDocument, hasStyle } from "solid-dom-testing";

import AddTenant from "./addTenant";

const test = suite<ReturnType<typeof render>>("<AddTenant />");

test.before.each((context) => {
	const returnValue = render(() => <AddTenant />);
	for (const name of Object.getOwnPropertyNames(returnValue)) {
		// @ts-expect-error
		context[name] = returnValue[name];
	}
});

test.after.each(({ unmount }) => unmount());

test("form render name input", ({ getByLabelText }) => {
	assert.ok(isInDocument(getByLabelText("Name")));
});

test("form render city input", ({ getByLabelText }) => {
	assert.ok(isInDocument(getByLabelText("City")));
});

test("form render area input", ({ getByLabelText }) => {
	assert.ok(isInDocument(getByLabelText("Area")));
});

test("form render members input", ({ getByLabelText }) => {
	assert.ok(isInDocument(getByLabelText("How Many Members")));
});

test("form render add tenant button", ({ getByText }) => {
	assert.ok(isInDocument(getByText("Register Tenant")));
});

test("form render reset button", ({ getByText }) => {
	assert.ok(isInDocument(getByText("Reset")));
});

test.run();
