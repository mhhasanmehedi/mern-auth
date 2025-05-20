import SSLCommerzPayment from "sslcommerz-lts";
import asyncHandler from "../middleware/asyncHandler.js";
import { generateTransactionId } from "../utils/generateTransactionId.js";

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;
const tran_id = generateTransactionId();

export const paymentSSLCommerz = asyncHandler(async (req, res, next) => {
  const information = {
    price: 200,
    name: "Mehedi  Hasan Rahat",
    address: "Mymensingh, Bangladesh",
    postCode: 2200,
  };

  const data = {
    total_amount: information.price,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `http://localhost:5000/api/payment/success/${tran_id}`,
    fail_url: `http://localhost:5000/api/payment/fail/${tran_id}`,
    cancel_url: `http://localhost:5000/api/payment/cancel/${tran_id}`,
    ipn_url: `http://localhost:5000/api/payment/ipn`,
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: information.name,
    cus_email: "customer@example.com",
    cus_add1: information.address,
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: information.postCode,
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);

  sslcz.init(data).then((apiResponse) => {
    let GatewayPageURL = apiResponse.GatewayPageURL;
    res.send({
      url: GatewayPageURL,
    });

    // Do api request for create order payment:false

    console.log("Redirecting to: ", GatewayPageURL);
  });
});

export const paymentSuccess = async (req, res, next) => {
  console.log("Payment Success:", req.params.tranId);
  // Do api request for create order payment:true

  res.redirect("http://localhost:5173/");
};

export const paymentFail = async (req, res, next) => {
  console.log("Payment Failed:", req.params.tranId);
  // Do api request for delete order or payment:false
  res.redirect("http://localhost:5173/");
};

export const paymentCancel = async (req, res, next) => {
  console.log("Payment Canceled:", req.params.tranId);
  res.redirect("http://localhost:5173/");
};

export const paymentIpn = async (req, res, next) => {
  console.log("IPN Data:", req.body);
  res.redirect("http://localhost:5173/");
};
