import { AxiosRequestConfig } from "axios";
import CryptoJS from "crypto-js";

const baseUrl = "https://no23.lavina.tech/";

function processRequest({
  method,
  data,
  url,
  body,
}: {
  method: string;
  data: any;
  url: string;
  body: { key: string; secret: string };
}) {
  const requestConfig: AxiosRequestConfig = {
    maxBodyLength: Infinity,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (requestConfig.url === "signup") {
    requestConfig.url = baseUrl + url;
    requestConfig.data = data;
    requestConfig.method = method;
  } else {
    const signstr = `${method!}/${url!}${data ? JSON.stringify(data) : ""}${
      (body && body.secret) || (data && data.secret)
    }`;

    const Sign = CryptoJS.MD5(signstr).toString();
    requestConfig.url = baseUrl + url;
    requestConfig.data = data;
    requestConfig.method = method;

    requestConfig.headers = {
      ...requestConfig.headers,
      Key: (body && body.key) || (data && data.key),
      Sign,
    };
  }

  return requestConfig;
}

export default processRequest;
