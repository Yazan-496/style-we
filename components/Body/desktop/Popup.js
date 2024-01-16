import React from "react"

const Popup = ({onClose}) => {
  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  return (
    <div
      className="main main-email flex flex-row w-[full]"
      style={{ fontFamily: "", color: "", backgroundColor: "" }}
    >

      <div className="general-banner">
        <div className="w-[350px] h-[350px] img-wrapper">
          <img
            className="w-[350px] h-[350px]"
            src="https://wzstatic.streamoptim.com/img/compaign/20221207/100052_820966/a7ddc3784d4599b27b1967777b0a6c63.gif"
            alt=""
          />
        </div>
      </div>
      <div className="general-main">
        <a className="p-[10px]" href="#" onClick={handleCloseClick}>
          x
        </a>
        <div
          className="title  p-[10px]"
          style={{
            display: "block",
            fontFamily: "Alegreya-Sans-Ex-Bold",
            fontSize: 19,
            color: "#000000"
          }}
        >
          Don't leave without taking discount
        </div>
        <div
          className="sub-title  p-[10px]"
          style={{
            display: "block",
            fontFamily: "Helvetica Neue",
            fontSize: 33,
            color: "#ED4E1E"
          }}
        >
          10%-50% OFF
        </div>
        <div
          className="sub-label subject  p-[10px]"
          style={{
            display: "block",
            fontFamily: "Alegreya-Sans-Ex-Bold",
            fontSize: 21,
            color: "#F2E41F"
          }}
        >
          On your order
        </div>
        <div className="stream-email-input-wrapper p-[10px]">
          <div className="tip stream-ellipsis" style={{ opacity: 0 }}>
            Invalid email
          </div>
          <input
            type="text"
            className="email-input"
            placeholder="Just Leave Your Email"
            style={{
              fontFamily: "Montserrat",
              fontSize: 12,
              color: "#333",
              backgroundColor: "#def7f8"
            }}
            data-collect-click='{"event_id":"input_pop_ups"}'
          />
          <div
            className="email-detail suffix-list  p-[10px]"
            style={{ fontFamily: "", color: "", backgroundColor: "" }}
          />
        </div>
        <div
          id="stream-general-e-get p-[10px]"
          className="stream-subscribe-button"
          style={{
            fontFamily: "Helvetica Neue",
            fontSize: 16,
            color: "#F6F6F6",
            backgroundColor: "#3B3A37"
          }}
          data-collect-click='{"event_id":"pop_ups"}'
        >
          GET MY DISCOUNT
        </div>
        <div className="privacy-tip" style={{ display: "none" }}>
          * Your personal information will be strictly protected from disclosure.
        </div>
        <div className="privacy-tip" style={{ display: "none" }}>
          By signing up you agree with our{" "}
          <a
            href="https://www.myfaceboxer.com/pages/privacy-policy"
            target="_blank"
          >
            Privacy Policy
          </a>
          .
        </div>
      </div>
    </div>

  )
}
export default Popup