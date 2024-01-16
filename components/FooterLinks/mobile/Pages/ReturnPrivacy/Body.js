import React from "react";
import Image from "helpers/image";

const Body = () => {
  return (
    <div
      className="w-full flex flex-col justify-start items-center relative gap-6 px-14 py-8 rounded bg-white"
      style={{ padding: 15 }}>
      {" "}
      <div className="information-detial braft-output-content">
        <h3 class="information-title">Information</h3>
        <h4 class="information-name">Return Policy</h4>
        <div className="information-content">
          <p className="MsoNormal">Thank you for shopping at StyleWe. </p>
          <p>
            If you are not completely satisfied with your purchase, it is easy
            to get a refund. Simply follow the instructions and submit a return
            request on your order page, and we will try our best to meet your
            request. If anything is unclear, please contact our Customer Care
            team for return instructions and a return address.
          </p>
          <h4 className="MsoNormal"> </h4>
          <p />
          <h4>
            <strong>
              <span style={{ fontSize: "12ptpx" }}>1、Return Policy</span>
            </strong>
          </h4>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              - All Purchases (
              <span style={{ color: "#07a9fe" }}>
                except swimwear, underwear, panties, bags, and accessories
              </span>
              ) can be returned within <strong>30 days </strong>of the delivery
              date.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - Items must be unused, undamaged, and in their original
              packaging, and all items in the package must be intact. Otherwise,
              the buyer is responsible for all fees incurred, and no refund will
              be issued.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - The Buyer is responsible for the return shipping cost.
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>
              <span style={{ fontSize: "12ptpx" }}>
                2、Purchase Not Eligible for Return
              </span>
            </strong>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              - <strong>Final sale item(s) is not eligible for return</strong>.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - Swimwear,underwear,panties,bags and accessories cannot be
              returned or exchanged.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - Swimwear can only be returned if it is defective/damaged or the
              wrong item.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - You must email us a picture showing the problem/defect after
              submitting the return request online.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              <strong>Note: </strong>Items that do not meet these criteria will
              not be considered for return.
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>
              <span style={{ fontSize: "12ptpx" }}>
                3、How to Make Your Return
              </span>
            </strong>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              <strong>Step1: </strong>Click the "
              <u>
                <span style={{ color: "#0000ff" }}>
             
                </span>
              </u>
              " feature at the bottom menu of our home page,then enter your{" "}
              <strong>Email Address</strong>&nbsp;and{" "}
              <strong>Order Number</strong> accordingly.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              <strong>Step2: </strong>There is a "<strong>Return</strong>"
              button in the specific order. You need to click it to submit the
              return request and you will get authorization and a return address
              via email{" "}
              <span style={{ color: "#07a9fe" }}>within 48 hours</span>.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              <strong>Step3: </strong>Input return shipping details ({" "}
              <span style={{ color: "#07a9fe" }}>
                tracking No.&amp; delivery company
              </span>
              &nbsp;) on order page after returning the package to insure speedy
              process.(Log in our website and click "
              <strong>
                You - Order list - After sales history - View Detail - Return{" "}
              </strong>
              " to input the return shipping details).
            </span>
            <br />
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              Once we receive your return, please allow{" "}
              <span style={{ color: "#07a9fe" }}>3 to 7 business days</span>
              &nbsp;to process your returns. We'll email you once we have
              processed your refund.
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>
              <span style={{ color: "#c0392b" }}>
                <span style={{ fontSize: "12ptpx" }}>4、Kind reminder</span>
              </span>
            </strong>{" "}
            <strong>
              <span style={{ fontSize: "12ptpx" }}>before returning</span>
            </strong>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              -{" "}
              <strong>
                Item(s) must NOT be returned to the address on the package you
                received.{" "}
              </strong>
              That is not our return address and will affect the processing of
              your return.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - Return packages should be authorized.{" "}
              <strong>
                Any return request not authorized by the customer service will
                not be honored.{" "}
              </strong>
              Please be sure to submit a return request online or{" "}
              <u>
                <span style={{ color: "#0000ff" }}>
                </span>
              </u>
              &nbsp;before returning.
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - Please ensure that the item(s) you are returning matches your
              return request. Do not include additional item(s) not listed.{" "}
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>
              <span style={{ fontSize: "12ptpx" }}>5、Fast Refund</span>
            </strong>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              - Send the returned purchase in its original packaging with
              product tag back to our return center. Once the returned parcel
              reaches the return center, the refund will be issued to your
              StyleWe Wallet or the original payment account (or other refund
              methods) as per your request
              <span style={{ color: "#07a9fe" }}>
                &nbsp;in 3 to 7 business days
              </span>
              .
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              <strong>Note: </strong>Generally, the original shipping charges
              for an order (if any) are non-refundable.
            </span>
          </p>
          <p />
          <p />
          <p>
            <span style={{ fontSize: "12ptpx" }}>
              <strong>6、Wallet Credit Refund(</strong>Faster, more and safer
              <strong>)</strong>
            </span>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              - You can access your wallet credits if you return an item and
              choose to receive a wallet credit instead of a cash refund to the
              original method of payment used. The wallet credits can be used
              for future purchases on StyleWe at any time, subject to the{" "}
              <u>
           
              </u>
            </span>{" "}
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              - It normally takes{" "}
              <span style={{ color: "#07a9fe" }}>24 hours</span>
              &nbsp;for the funds to appear in your credit Wallet.{" "}
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              -You'll know more details about wallet credit rufund through{" "}
              <u>
                <span style={{ color: "#0000ff" }}>
             
                </span>
              </u>
              .
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>
              <span style={{ fontSize: "12ptpx" }}>7、Exchange policy</span>
            </strong>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              - <strong>Exchange is not available at this time.</strong>
              &nbsp;All exchange requests will be processed as refunds. If you
              wish to exchange a product, you will need to return your purchase
              for refund and place a new order.
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>
              <span style={{ fontSize: "12ptpx" }}>8、Order Cancellation</span>
            </strong>
          </p>
          <p className="MsoNormal">
            <span style={{ fontSize: "12ptpx" }}>
              - Your order will be fully refunded if it is canceled within 24
              hours of purchase.{" "}
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              -{" "}
              <strong>
                We will NOT accept an order cancellation request if the order
                has already shipped.
              </strong>
            </span>
            <br />
            <span style={{ fontSize: "12ptpx" }}>
              Please submit a help ticket from{" "}
              <u>
                <span style={{ color: "#0000ff" }}>
                </span>
              </u>{" "}
              if you decide to cancel the order.
            </span>
          </p>
          <p />
          <p />
          <p>
            <strong>Contact us&nbsp;</strong>
          </p>
          <p className="MsoNormal">
            If you have further questions/issues,please don’t hesitate to{" "}
            <span style={{ color: "#07a9fe" }}>
              <u>
          
              </u>
            </span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
export default Body;
