
import { createEffect } from "solid-js";
import { isVerifiedAccount } from "../service/auth";
import { useNavigate } from "@solidjs/router";
import { getCurrentUser } from "../service/auth";
import { QueryObj, getDocumentsWithQuery } from "../service/firestore";
import { DocumentData } from "firebase/firestore";


const Dashboard = () => {

  const navigate = useNavigate();

  createEffect(async () => {
    if (!await isVerifiedAccount()) {
      navigate("/403");
    }
    if (!await getAccountInfo()) {
      const user = await getCurrentUser();
      navigate(`/${user?.uid}/account/add`);
    }
  });

  const handleRegisterTenant = async () => {
    const user = await getCurrentUser();
    navigate(`/${user?.uid}/tenant/add`);
  }

  return (
    <div class="bg-gray-100 h-screen">
      <header class="bg-white shadow">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
          <div class="flex items-center justify-end">
            <div class="ml-4 flex items-center md:ml-6">
              {/* pulldown menu select */}
              <select class="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                <option>🏘️Tenant Info</option>
                <option>🪪Account Info</option>
                <option>🛫Product Info</option>
                <option>⚙️Settings</option>
              </select>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mx-2 rounded">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="px-4 py-6 sm:px-0">
          <div class="border-4 border-dashed border-gray-200 rounded-lg h-96">
            <div class="flex flex-col items-center justify-center h-full">
              <h2 class="text-2xl font-bold text-gray-900">Welcome to Dashboard</h2>
              <button class="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100" onClick={handleRegisterTenant}>
                Register Tenant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

async function getAccountInfo(): Promise<DocumentData | null> {
  const user = await getCurrentUser();
  const uid = user?.uid;
  const collectionName = 'accounts';
  const queryObj: QueryObj = {
    field: 'uid',
    operator: '==',
    value: uid
  };
  const result = await getDocumentsWithQuery(collectionName, queryObj);
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