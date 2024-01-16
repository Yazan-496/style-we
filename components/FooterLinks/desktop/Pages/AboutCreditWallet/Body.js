import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white">
      <h1 className="flex-grow-0 flex-shrink-0 text-2xl font-semibold text-left text-[#31353c]">
        About Wallet
      </h1>
      <div className="information-detial braft-output-content">
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <span style={{ lineHeight: "1.65" }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                <strong>
                  <span style={{ fontSize: 16 }}>
                    1. What is My Credit Wallet?
                  </span>
                </strong>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            It is a virtual wallet linked to your StyleWe account, where you
            will be able to access your wallet credits if you return an item and
            choose to receive a wallet credit instead of a cash refund to the
            original payment method. The Credit Wallet can be used for future
            purchases on StyleWe at any time, subject to the
          </span>{" "}
          <span style={{ fontSize: 16 }}>
            <u>
              <span style={{ color: "#07a9fe" }}>
                {/* <a
                  target="_blank"
                >
                  Terms and Conditions
                </a> */}
              </span>
            </u>
            .
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <span style={{ lineHeight: "1.65" }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                <strong>
                  <span style={{ fontSize: 16 }}>
                    2. How do I use My Credit Wallet
                  </span>
                </strong>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            You may view your Wallet Credit balance in your StyleWe Wallet at
            checkout and apply it to your purchase.
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Please note that if you choose to pay for your order in a currency
            different from the wallet credits you have in your wallet, your
            wallet credit balance will not appear on the checkout page.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <span style={{ lineHeight: "1.65" }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                <strong>
                  <span style={{ fontSize: 16 }}>
                    3. What if the Wallet Credit balance is not enough to pay
                    the order amount?
                  </span>
                </strong>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            We support payment alone with Credit Wallet as well as co-payments.
            When your Wallet Credit balance is not enough, we also support
            combined payments with other payment methods.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <span style={{ lineHeight: "1.65" }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                <strong>
                  <span style={{ fontSize: 16 }}>
                    4. Is there any limit on the use of the Wallet Credit？
                  </span>
                </strong>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            There is no upper limit on how much Wallet Credit can pay for an
            order.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    5. How can I access my Credit Wallet?
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            To have a Credit Wallet, you must sign up as a member and accept our{" "}
            <span style={{ color: "#07a9fe" }}>
            
            </span>
            . And if you have not previously received a wallet credit refund,
            the wallet account is not visible. The Wallet account will appear in
            your StyleWe account after the initial refund has been successfully
            issued and will continue to be visible afterward.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    6. Can I transfer my Wallet Credit to others？
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Wallet credits may not be given or transferred to others.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    7. Can I transfer My Wallet Credit to another StyleWe Wallet
                    account?
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            It is not possible to transfer wallet credits from one StyleWe
            Wallet account to another.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    8. How do I withdraw money from My credit Wallet？
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            The funds will be returned to your account with the relevant payment
            agent from which the original payment was taken. Under no
            circumstances will we allow a cash refund of your Wallet.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <span style={{ lineHeight: "1.65" }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                <strong>
                  <span style={{ fontSize: 16 }}>
                    9. Will my Wallet Credit expire?
                  </span>
                </strong>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Wallet credit is valid for <u>three years</u> from the date of
            issuance and will be automatically invalidated if it expires.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    10. What if I forget the password of my account?
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            If you forget your password, please click "
            <span style={{ color: "#07a9fe" }}>
            </span>
            " or apply to StyleWe to change it (
            <span style={{ color: "#07a9fe" }}>
       
            </span>
            ).
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    11. What if my Wallet Credit is stolen?
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Users should protect their accounts and passwords. StyleWe will not
            be responsible for the theft of Wallet Credit due to their reasons.
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            If your wallet credits are stolen, please reset your account
            password immediately or{" "}
            <span style={{ color: "#07a9fe" }}>
            
            </span>{" "}
            to freeze your wallet account to avoid further theft.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>
                    12. How long does it take for the money withdrawn to appear
                    in My Account?
                  </span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            It normally takes a week for the funds to appear in your account.
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }} />
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
            <span style={{ lineHeight: "1.65" }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                <strong>
                  <span style={{ fontSize: 16 }}>
                    13. Can I still pay with My Credit Wallet if I already
                    applied a coupon code？
                  </span>
                </strong>
              </span>
            </span>
          </span>
        </p>
        <p style={{ textAlign: "start", textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Yes, you may use your wallet credits as well as a coupon.
          </span>
        </p>
        <p />
        <p style={{ textIndent: "2em" }}>
          <strong>
            <span style={{ fontSize: 16 }}>
              <span style={{ backgroundColor: "#cccccc" }}>
                14.How long does it take to get a wallet credit refund to my
                Wallet account?{" "}
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Refunds usually take up to <u>24 hours</u> to appear in your Wallet
            account.
          </span>
        </p>
        <p />
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            <span style={{ backgroundColor: "#cccccc" }}>
              <strong>
                15. Are Wallet Credit refunds available in all currencies?
              </strong>
            </span>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Currently, Wallet Credit refunds are only available in the
            currencies we list on our website.
          </span>
        </p>
        <p style={{ textIndent: "2em" }} />
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            <strong>
              <span style={{ backgroundColor: "#cccccc" }}>
                16. Can Wallet Credit be used with ApplePay/GooglePay?{" "}
              </span>
            </strong>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Sorry, ApplePay and GooglePay do not support co-payments with the
            wallet.{" "}
          </span>
        </p>
        <p />
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            <strong>
              <span style={{ backgroundColor: "#cccccc" }}>
                17. Is it possible to use Wallet Credit on the APP?
              </span>
            </strong>
          </span>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            Sorry, Wallet Credit is currently unavailable in the APP.
          </span>
        </p>
        <p />
        <p style={{ textIndent: "2em" }}>
          <strong>
            <span style={{ fontFamily: "Arial, Helvetica, sans-serif" }}>
              <span style={{ lineHeight: "1.65" }}>
                <span style={{ backgroundColor: "#cccccc" }}>
                  <span style={{ fontSize: 16 }}>18. Terms of Services</span>
                </span>
              </span>
            </span>
          </strong>
        </p>
        <p style={{ textIndent: "2em" }}>
          <span style={{ fontSize: 16 }}>
            You should read this{" "}
            <strong>
              <u>
                <em>
                  <span style={{ color: "#07a9fe" }}>
              
                  </span>
                </em>
              </u>
            </strong>{" "}
            carefully before agreeing to it.
          </span>
        </p>
      </div>
    </div>
  );
};
export default Body;
