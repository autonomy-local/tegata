import type { Account } from "../../schema/account";
import type { User } from "../../service/auth";
import { addNewDocument, firestore } from "../../service/firestore";
import { getCurrentUser } from "../../service/auth";
import { createSignal, createEffect } from "solid-js";

const AddAccount = () => {
	const [user, setUser] = createSignal<User | null>(null);

	createEffect(async () => {
		const currentUser = await getCurrentUser();
		if (currentUser) {
			setUser(currentUser);
		}
	});

	const registerAccount = async () => {
		const name = document.getElementById("name") as HTMLInputElement;
		const email = document.getElementById("email") as HTMLInputElement;
		const role = document.getElementById("role") as HTMLSelectElement;
		const userId = user()?.uid;
		const newAccount = {
			id: userId,
			name: name.value,
			email: email.value,
			role: role.value as Account["role"],
		};
		const error = await addNewDocument(firestore, "accounts", newAccount);
		if (error) {
			console.error(error);
		} else {
			window.location.href = "/dashboard";
		}
	};
	return (
		<div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div class="px-4 py-6 sm:px-0">
				<div class="border-4 border-dashed border-gray-200 rounded-lg h-auto py-6">
					<div class="flex flex-col items-center justify-center h-full">
						<h2 class="text-2xl font-bold text-gray-900">Add Account</h2>
						<form class="mt-4 w-96">
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="name"
								>
									Name
								</label>
								<input
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="name"
									type="text"
									placeholder="Name"
								/>
							</div>
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="email"
								>
									Email
								</label>
								<input
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder="Email"
								/>
							</div>
							<div class="mb-4">
								<label
									class="block text-gray-700 text-sm font-bold mb-2"
									for="role"
								>
									Role
								</label>
								<select
									class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
									id="role"
								>
									<option>admin</option>
									<option>readOnly</option>
								</select>
							</div>
							<div class="flex items-center justify-between">
								<button
									class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="button"
									onClick={() => registerAccount()}
								>
									Register Account
								</button>
								<button
									class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
									type="reset"
									onClick={() => {
										const name = document.getElementById("name") as HTMLInputElement;
										const email = document.getElementById("email") as HTMLInputElement;
										name.value = "";
										email.value = "";
									}}
								>
									Reset
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AddAccount;
