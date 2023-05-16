import axiosBaseUrl from "../../../app/apiBaseUrl";
import Cookies from "js-cookie";

export const usePostData = async (url, data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${Cookies.get("token")}`,
    },
  };

  const res = await axiosBaseUrl.post(url, data, config);
  return res;
};
