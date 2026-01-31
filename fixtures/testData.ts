export const testData = {
  restaurant: {
    email: process.env.RESTAURANT_EMAIL!,
    password: process.env.RESTAURANT_PASSWORD!,
    baseURL: process.env.CLIENT_URL!,  // https://client.entugo.com
  },
  customer: {
    name: "Jeeva",
    code: "OV47LO2X",
    email: process.env.CUSTOMER_EMAIL!,
    password: process.env.CUSTOMER_PASSWORD!,
    baseURL: process.env.CUSTOMER_URL!,    // https://customer.entugo.com
  }
};
;

