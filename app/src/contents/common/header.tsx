import { signOutUser } from "../../service/auth";

const Header = () => {
	const handleSelectChange = (e: Event) => {
		const target = e.target as HTMLSelectElement;
		const value = target.value;
		switch (value) {
			case "tenant":
				window.location.href = "/dashboard/tenant";
				break;
			case "account":
				window.location.href = "/dashboard/account";
				break;
			case "product":
				window.location.href = "/dashboard/product";
				break;
			case "setting":
				window.location.href = "/dashboard/setting";
				break;
			default:
				break;
		}
	};
	return (
		<header class="bg-white shadow">
			<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
				<h1 class="text-3xl font-bold leading-tight text-gray-900">
					Dashboard
				</h1>
				<div class="flex items-center justify-end">
					<div class="ml-4 flex items-center md:ml-6">
						<select
							onChange={(e) => handleSelectChange(e)}
							class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
						>
							<option value="">👉Select</option>
							<option value="tenant">🏘️Tenant Info</option>
							<option value="account">🪪Account Info</option>
							<option value="product">🛫Product Info</option>
							<option value="setting">⚙️Settings</option>
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
	);
};

export default Header;
