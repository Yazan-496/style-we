import { useEffect, useState } from "react";
import store from "../../store";

const Toast = ({ message, timeout, left, top }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timer = setTimeout(() => {
      setShow(false);
      // store.dispatch({ type: "CLEAR_TOAST_MESSAGE" });
    }, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout]);

  return (
    <>
      {show && <div className="toast z-[99999999999]">{message}</div>}
      <style jsx>{`
        .toast {
          position: fixed;
          z-index: 111111111111;
          top: 30%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: flex-start;
          text-align: left;
          color: #fff;
          background-color: #000;
          padding: 10px;
          border-radius: 4px;
          opacity: 1;
          transition: opacity 300ms;
          width: max-content;
        }
      `}</style>
    </>
  );
};

export default Toast;
