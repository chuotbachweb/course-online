import { httpRequest } from "~/utils/httprequest";

export const createUrlVnPay = async ({ data }) => {
  try {
    const res = httpRequest.post(`payment/create_payment_vnpay`, data, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const callbackVnPay = async ({ param }) => {
  try {
    const res = httpRequest.post(`payment/vnpay_callback`, param, {
      headers: { authorization: "Bearer " + localStorage.token },
    });
    return res;
  } catch (error) {
    return error;
  }
};