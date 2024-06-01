import { test } from "uvu";
import * as assert from "uvu/assert";
import fs from "node:fs";
import type {
	RulesTestEnvironment,
} from "@firebase/rules-unit-testing";
import { initializeTestEnvironment } from "@firebase/rules-unit-testing";

import { getAllDocumentsWithCollectionName } from "./firestore";
import type { Firestore } from "firebase/firestore";

// setup the test environment with the Firestore emulator
// before running the tests
let testEnv: RulesTestEnvironment | null = null;

test.before.each(async () => {
	testEnv = await initializeTestEnvironment({
		projectId: "test-project",
		firestore: {
			rules: fs.readFileSync("/home/yamashita/tegata/firestore.rules", "utf8"),
			host: "localhost",
			port: 8080,
		},
	});
});

test.after.each(async () => {
	await testEnv?.cleanup();
});

test("getAllDocumentsWithCollectionName", async () => {
	const user = testEnv?.authenticatedContext("test-user");
	const firestore = user?.firestore() as unknown as Firestore;
	const collectionName = "users";
	if (!firestore) {
		throw new Error("Firestore is not initialized");
	}
	const result = await getAllDocumentsWithCollectionName(
		firestore,
		collectionName,
	);
	if (result instanceof Error) {
		throw result;
	}
	assert.is(result.length, 0);
});

test.run();
