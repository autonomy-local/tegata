import { createSignal, createEffect, Show } from "solid-js";
import { getCurrentUser, signOutUser } from "../../service/auth";
import { getDocumentsWithQuery, firestore } from "../../service/firestore";
import AccountContent from "../../contents/account/accountContent";
import Header from "../../contents/common/header";
import type { QueryObj } from "../../service/firestore";
import type { Account } from "../../schema/account";

const AccountPage = () => {
	const [accountInfo, setAccountInfo] = createSignal<Account | null>(null);
	createEffect(async () => {
		const info = await getAccountInfo();
		setAccountInfo(info);
	});
	return (
		<div class="bg-gray-100 h-screen">
			<Header />
			<div class="max-w-7xl mx-auto my-2 py-6 sm:px-6 lg:px-8">
				<Show when={accountInfo() === null}>
					<div class="flex justify-center items-center">
						<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900" />
					</div>
				</Show>
				<Show when={accountInfo() !== null}>
					{AccountContent(accountInfo() !== null, accountInfo())}
				</Show>
			</div>
		</div>
	);
};

export default AccountPage;

async function getAccountInfo(): Promise<Account | null> {
	const user = await getCurrentUser();
	const uid = user?.uid;
	const collectionName = "accounts";
	const queryObj: QueryObj = {
		field: "id",
		operator: "==",
		value: uid,
	};
	const result = await getDocumentsWithQuery(
		firestore,
		collectionName,
		queryObj,
	);
	if (result instanceof Error || result.length !== 1) {
		return null;
	}
	return result[0] as Account;
}
