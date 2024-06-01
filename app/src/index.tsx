import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";
import "./index.css";

import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Page403 from "./pages/403";
import AddAccount from "./contents/account/addAccount";
import AddTenant from "./contents/tenant/addTenant";
import { isVerifiedAccount } from "./service/auth";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
	throw new Error(
		"Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
	);
}

if (root) {
	render(
		() => (
			<Router>
				<Route path="/" component={Login} />
				<Route
					path="/dashboard/"
					component={Dashboard}
					load={async () => await checkAuth()}
				/>
				<Route
					path="/dashboard/account/add"
					component={AddAccount}
					load={async () => await checkAuth()}
				/>
				<Route
					path="/dashboard/tenant/add"
					component={AddTenant}
					load={async () => await checkAuth()}
				/>
				<Route path="*403" component={Page403} />
			</Router>
		),
		root,
	);
}

async function checkAuth() {
	if (!(await isVerifiedAccount())) {
		window.location.href = "/403";
	}
}
