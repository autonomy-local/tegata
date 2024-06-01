import { createSignal, createEffect,Show } from "solid-js";
import { getCurrentUser } from "../service/auth";
import { getDocumentsWithQuery, firestore }from "../service/firestore";
import type { QueryObj } from "../service/firestore";
import type { DocumentData } from "firebase/firestore";

const Dashboard = () => {
	const [accountInfo, setAccountInfo] = createSignal<DocumentData | null>(null);
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
							<button type="button" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
								Logout
							</button>
						</div>
					</div>
				</div>
			</header>
			<div class="max-w-7xl mx-auto my-2 py-6 sm:px-6 lg:px-8">
				<div class="px-4 py-6 sm:px-0">
					{/* tabs */}
					<div class="flex items-center">
						<div class="bg-white rounded-lg h-16 w-1/4 mx-2">
							<button type="button" class="w-full h-full text-lg font-bold text-gray-700">
								🎛️Account Settings
							</button>
						</div>
						<div class="bg-white rounded-lg h-16 w-1/4">
							<button type="button" class="w-full h-full text-lg font-bold text-gray-700">
								🧾Account Logs
							</button>
						</div>
					</div>
					<div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
						<Show when={accountInfo()}>
							<div class="flex flex-col items-center justify-center h-full">
								<h2 class="text-2xl font-bold text-gray-900">
									Welcome back, {accountInfo()?.name}!
								</h2>
								<p class="text-lg text-gray-700">
									Your email address is {accountInfo()?.email}.
								</p>
								<p class="text-lg text-gray-700">
									Your role is {accountInfo()?.role}.
								</p>
							</div>
						</Show>
						<Show when={!accountInfo()}>
							<div class="flex flex-col items-center justify-center h-full">
								<h2 class="text-2xl font-bold text-gray-900">
									Welcome to your dashboard!
								</h2>
								<a
									href="account/add"
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 my-2 rounded"
								>
									Register Tenant
								</a>
							</div>
						</Show>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;

async function getAccountInfo(): Promise<DocumentData | null> {
	const user = await getCurrentUser();
	const uid = user?.uid;
	const collectionName = "accounts";
	const queryObj: QueryObj = {
		field: "id",
		operator: "==",
		value: uid,
	};
	const result = await getDocumentsWithQuery(firestore, collectionName, queryObj);
	if (result instanceof Error) {
		return null;
	}
	if (result.length === 0) {
		return null;
	}
	if (result.length > 1) {
		return null;
	}
	return result[0];
}
