const fetchClient = async (url: string, options: RequestInit) => {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY;
  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  if (!apiKey) {
    throw new Error("API key is missing");
  }

  if (!apiUrl) {
    throw new Error("API url is missing");
  }

  const response = await fetch(apiUrl + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": apiKey,
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorResponse = await response.json();
    console.log("errorResponse", errorResponse);

    throw new Error(errorResponse.message);
  }

  return response.json();
};

export default fetchClient;
