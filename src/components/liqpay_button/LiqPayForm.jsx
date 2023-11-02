import React from 'react';

const LiqPayForm = () => {
  const liqpayFormHTML = `
    <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
      <input type="hidden" name="data" value="eyJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJkZXNjcmlwdGlvbiB0ZXh0Iiwib3JkZXJfaWQiOiJvcmRlcl9pZF_1IiwidmVyc2lvbiI6MywicHVibGljX2tleSI6InNhbmRib3hfaTMxMTEwNDMwMTI0In0=" />
      <input type="hidden" name="signature" value="0YWj8dn+qmEvy7y58yehwzWTzAI=" />
      <script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>
      <sdk-button label="Сплатити" background="#77CC5D" onClick="submit()"></sdk-button>
    </form>
  `;

  return (
    <div>
      <h2>LiqPay Payment Form</h2>
      <div
        dangerouslySetInnerHTML={{ __html: `
        <form method="POST" action="https://www.liqpay.ua/api/3/checkout" accept-charset="utf-8">
          <input type="hidden" name="data" value="eyJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOjEsImN1cnJlbmN5IjoiVVNEIiwiZGVzY3JpcHRpb24iOiJkZXNjcmlwdGlvbiB0ZXh0Iiwib3JkZXJfaWQiOiJvcmRlcl9pZF_1IiwidmVyc2lvbiI6MywicHVibGljX2tleSI6InNhbmRib3hfaTMxMTEwNDMwMTI0In0=" />
          <input type="hidden" name="signature" value="0YWj8dn+qmEvy7y58yehwzWTzAI=" />
          <script type="text/javascript" src="https://static.liqpay.ua/libjs/sdk_button.js"></script>
          <sdk-button label="Сплатити" background="#77CC5D" onClick="submit()">dasdsada</sdk-button>
        </form>
      ` }}
      />
    </div>
  );
};

export default LiqPayForm;