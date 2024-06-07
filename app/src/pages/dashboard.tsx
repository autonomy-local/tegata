import { createSignal, createEffect, Show } from "solid-js";
import { getCurrentUser, signOutUser } from "../service/auth";
import { getDocumentsWithQuery, firestore } from "../service/firestore";
import AccountContent from "../contents/account/accountContent";
import type { QueryObj } from "../service/firestore";
import type { Account } from "../schema/account";

const Dashboard = () => {
	const [accountInfo, setAccountInfo] = createSignal<Account | null>(null);
	createEffect(async () => {
		const info = await getAccountInfo();
		setAccountInfo(info);
	});
	return (
		<div class="bg-gray-100 h-screen">
			<header class="bg-white shadow">
				<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
					<h1 class="text-3xl font-bold leading-tight text-gray-900">
						Dashboard
					</h1>
					<div class="flex items-center justify-end">
						<div class="ml-4 flex items-center md:ml-6">
							<select class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
								<option>🏘️Tenant Info</option>
								<option selected>🪪Account Info</option>
								<option>🛫Product Info</option>
								<option>⚙️Settings</option>
							</select>
							<button
								type="button"
								class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded"
								onClick={async () => {
									await signOutUser();
									window.location.href = "/";
								}}
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>
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

export default Dashboard;

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
	if (result instanceof Error) {
		return null;
	}
	if (result.length === 0) {
		return null;
	}
	if (result.length > 1) {
		return null;
	}
	return result[0] as Account;
}
