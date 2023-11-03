import React, { useEffect } from 'react';

const LiqPayCheckout = () => {
  useEffect(() => {
    window.LiqPayCheckoutCallback = function() {
      window.LiqPayCheckout.init({
        data: "eyAidmVyc2lvbiIgOiAzLCAicHVibGljX2tleSIgOiAieW91cl9wdWJsaWNfa2V5IiwgImFjdGlv" +
          "biIgOiAicGF5IiwgImFtb3VudCIgOiAxLCAiY3VycmVuY3kiIDogIlVTRCIsICJkZXNjcmlwdGlv" +
          "biIgOiAiZGVzY3JpcHRpb24gdGV4dCIs ICJvcmRlcl9pZCIgOiAib3JkZXJfaWRfMSIgfQ==",
        signature: "QvJD5u9Fg55PCx/Hdz6lzWtYwcI=",
        embedTo: "#liqpay_checkout",
        language: "ru",
        mode: "embed" // embed || popup
      }).on("liqpay.callback", function(data) {
        console.log(data.status);
        console.log(data);
      }).on("liqpay.ready", function(data) {
        // ready
      }).on("liqpay.close", function(data) {
        // close
      });
    };
    console.log(window);
  }, []);

  return <div id="liqpay_checkout">
    <script src="//static.liqpay.ua/libjs/checkout.js" async></script>
  </div>;
};

export default LiqPayCheckout;