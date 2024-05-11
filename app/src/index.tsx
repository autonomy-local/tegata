import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import "./index.css";

import Login from './pages/login';
import Dashboard from './pages/dashboard';
import Page403 from './pages/403';

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
    </Router>
  ),
  document.getElementById('root')!,
)
