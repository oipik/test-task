export const useHttp = () => {

  const request = async (url, method, body, headers) => {

    let counterRepeatRequest = 0;

    const handleRequest = async (url, method, body, headers) => {
      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (e) {
        console.log(e);
        if (counterRepeatRequest < 2) {
          ++counterRepeatRequest;
          return await handleRequest(url, method, body, headers)
        }
        return false;
      }
    }
    return await handleRequest(url, method, body, headers);
  }

  return { request }
}
