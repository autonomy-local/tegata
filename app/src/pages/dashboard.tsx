
import { createEffect } from "solid-js";
import { isVerifiedAccount } from "../service/auth";
import { useNavigate } from "@solidjs/router";

const Dashboard = () => {
  createEffect(() => {
    // check if user is signed in
    isVerifiedAccount().then((isVerified) => {
      if (!isVerified) {
        const navigate = useNavigate();
        navigate('/403');
      }
    });
  })
  return (
    // tailwindcss classes
    <div class="bg-gray-100 h-screen">
      <h1 class="text-2xl font-bold text-center pt-10">Dashboard</h1>
      <div class="flex justify-center items-center h-full">
        <div class="bg-white p-5 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold">Welcome to your dashboard!</h2>
          <p class="text-gray-500">You have successfully logged in.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;