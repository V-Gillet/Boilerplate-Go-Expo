import fetchClient from "./fetchClient";
import { secureStoreService } from "@/services/secureStore.service";

const helloQuery = async (): Promise<string> => {
  const item = await secureStoreService.getAuthToken();
  const data = await fetchClient("/hello", {
    method: "GET",
    headers: {
      Authorization: `${item}`,
    },
  });

  return data.message;
};

export { helloQuery };
