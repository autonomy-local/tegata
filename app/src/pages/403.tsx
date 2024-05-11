const Page403 = () => {
  return (

    // tailwindcss
    // use class not use className
    <div class="bg-gray-100 h-screen">
      <h1 class="text-2xl font-bold text-center pt-10">403 Forbidden</h1>
      <div class="flex justify-center items-center h-full">
        <div class="bg-white p-5 rounded-lg shadow-lg">
          <h2 class="text-xl font-semibold">You are not allowed to access this page.</h2>
          <p class="text-gray-500">Please contact the administrator.</p>
        </div>
      </div>
    </div>
  );
}

export default Page403;