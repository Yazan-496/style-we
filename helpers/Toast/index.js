import { useEffect, useState } from "react";
import store from "../../store";

const Toast = ({ message, timeout }) => {
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
      {show && <div className="toast">{message}</div>}
      <style jsx>{`
        .toast {
          background-color: #000;
          position: fixed;
          display: flex;
          top: 50%; /* Change from 30% to 50% */
          left: 50%; /* Add this line */
          transform: translate(-50%, -50%); /* Centering trick */
          align-items: center;
          justify-content: center; /* Change from flex-start to center */
          text-align: center;
          color: #fff;
          flex-wrap: wrap;
          padding: 10px;
          border-radius: 4px;
          opacity: 1; /* Correct value for opacity */
          z-index: 1111111111;
          transition: opacity 300ms;
          /* width: max-content; */ /* You can choose to uncomment this line if needed */
          width: inherit;
          max-width: 90%;
        }
      `}</style>
    </>
  );
};

export default Toast;
