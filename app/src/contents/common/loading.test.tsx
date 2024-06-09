import { suite } from "uvu";
import * as assert from "uvu/assert";

import { render } from "@solidjs/testing-library";
import { isInDocument } from "solid-dom-testing";

import Loading from "./loading";

const test = suite<ReturnType<typeof render>>("<Loading />");

test.before.each((context) => {
	const returnValue = render(() => <Loading />);
	for (const name of Object.getOwnPropertyNames(returnValue)) {
		// @ts-expect-error
		context[name] = returnValue[name];
	}
});

test.after.each(({ unmount }) => unmount());

test("page render loading", () => {
	assert.ok(isInDocument(document.querySelector(".animate-spin")));
});

test.run();
