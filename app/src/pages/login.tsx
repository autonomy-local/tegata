import { createSignal } from 'solid-js';
import { signIn } from '../service/auth';

export const Login = () => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  const validatePassword = (password: string) => {
    return password.length >= 8;
  }

  const handleEmailChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setEmail(target.value);
  }

  const handlePasswordChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setPassword(target.value);
  }

  const handleLogin = async () => {
    const userCredential = await signIn(email(), password());
    if (userCredential instanceof Error) {
      window.alert(userCredential.message);
    } else {
      const userId = userCredential.user.uid;
      history.pushState({}, '', `/${userId}/dashboard/`);
    }
  }

  return (
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div class="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => handleEmailChange(e)} />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="text-sm">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div class="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => handlePasswordChange(e)} />
          </div>
        </div>

        <div>
          <button type="button" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={() => handleLogin()}>Sign in</button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 90 day free trial</a>
      </p>
    </div>
  );
}