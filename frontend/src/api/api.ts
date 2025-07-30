// ***** start - import from packages *****
import apiClient from "./axios";

// ***** end - import from packages *****

import { GET_LOCAL_ACCESS_TOKEN } from "../utility/functions";
import { toast } from "react-hot-toast";
import { messages } from "../constants/messages";

type requestType =
  | "post"
  | "delete"
  | "postFormData"
  | "postWithoutToken"
  | "get"
  | "put"
  | "patch"
  | "deleteWithoutToken";

type toastStatusType = "show_toast" | "hide_toast";

// ***** start - Api function for call any type of apis *****
export const api = async (
  endpoint: string,
  data: any,
  type: requestType,
  toastVisiblity: toastStatusType = "show_toast"
) => {
  let res: any;
  const token = await GET_LOCAL_ACCESS_TOKEN();

  const getError = (err: any) => {
    res = err.response;
    if ([401, 403, 503, 500].includes(err.response?.status)) {
      if (toastVisiblity === "show_toast") {
        if (err.response.status === 401 || err.response.status === 403) {
          toast.error(messages?.sessionExpired);
        } else if (err.response.status === 500) {
          toast.error(messages?.internalServerError);
        } else {
          toast.error(messages?.serviceUnavailable);
        }
      }
    }
  };

  try {
    const config: any = {
      url: endpoint,
      method: type === "postFormData" ? "post" : type,
      headers: {
        "Content-Type":
          type === "postFormData" ? "multipart/form-data" : "application/json",
        ...(type !== "postWithoutToken" && type !== "deleteWithoutToken"
          ? { Authorization: `Bearer ${token}` }
          : {}),
      },
      ...(type !== "get" ? { data } : {}),
    };

    res = await apiClient(config);
  } catch (err) {
    getError(err);
  }

  return res;
};

// ***** end - Api function for call any type of apis *****
