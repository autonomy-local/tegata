import { Show } from "solid-js";
import type { Account } from "../../schema/account";
const AccountContent = (flag: boolean, accountObj: Account | null) => {
	return (
		<div class="px-4 py-6 sm:px-0">
			<Show when={flag}>
				<div class="flex items-center">
					<div class="bg-white rounded-lg h-16 w-1/4 mx-2">
						<button
							type="button"
							class="w-full h-full text-lg font-bold text-gray-700"
						>
							🎛️Account Settings
						</button>
					</div>
					<div class="bg-white rounded-lg h-16 w-1/4">
						<button
							type="button"
							class="w-full h-full text-lg font-bold text-gray-700"
						>
							🧾Account Logs
						</button>
					</div>
				</div>
			</Show>
			<div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
				<Show when={flag}>
					<div class="flex flex-col items-center justify-center h-full">
						<h2 class="text-2xl font-bold text-gray-900">
							Welcome back, {accountObj?.name}!
						</h2>
						<p class="text-lg text-gray-700">
							Your email address is {accountObj?.email}.
						</p>
						<p class="text-lg text-gray-700">
							Your role is {accountObj?.role}.
						</p>
					</div>
				</Show>
				<Show when={!flag}>
					<div class="flex flex-col items-center justify-center h-full">
						<h2 class="text-2xl font-bold text-gray-900">
							Welcome to your dashboard!
						</h2>
						<a
							href="dashboard/account/add"
							class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 my-2 rounded"
						>
							Register Tenant
						</a>
					</div>
				</Show>
			</div>
		</div>
	);
};

export default AccountContent;
