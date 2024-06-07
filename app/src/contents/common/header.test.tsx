import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render, fireEvent, waitFor } from "@solidjs/testing-library";
import { isInDocument, hasStyle } from "solid-dom-testing";

import Header from "./header";

const test = suite<ReturnType<typeof render>>("<Header />");

test.before.each((context) => {
	const returnValue = render(() => <Header />);
	for (const name of Object.getOwnPropertyNames(returnValue)) {
		// @ts-expect-error
		context[name] = returnValue[name];
	}
});

test.after.each(({ unmount }) => unmount());

test("page render dashboard title", ({ getByText }) => {
	assert.ok(isInDocument(getByText("Dashboard")));
});

test.run();
