import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import "./index.css";

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Page403 from './pages/403';
import AddAccount from './pages/account/addAccount';
import AddTenant from './pages/tenant/addTenant';

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(
  () => (
    <Router>
      <Route path="/" component={Login} />
      <Route path="/:userId/dashboard/" component={Dashboard} />
      <Route path="/403" component={Page403} />
      <Route path="/:userId/account/add" component={AddAccount} />
      <Route path="/:userId/tenant/add" component={AddTenant} />
    </Router>
  ),
  document.getElementById('root')!,
)
