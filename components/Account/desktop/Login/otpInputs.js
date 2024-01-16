import React, { useEffect, useRef, useState } from "react";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";
const OtpInputs = ({
  numberOfInputs,
  setOTP,
  token,
  authLoading,
  resendDisabled,
}) => {
  const [otpValues, setOtpValues] = useState(Array(numberOfInputs).fill(""));
  const [ringColor, setRingColor] = useState("");
  const [otpState, setOtpState] = useState(null);
  const dispatch = useDispatch();
  const [hz, setHz] = useState(false);
  const inputRefs = useRef([]);
  const firstInputRef = useRef(null); // Ref for the first input
  const handleChange = (index, value) => {
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      if (value.length === 1 && index < numberOfInputs - 1) {
        const nextInput = inputRefs.current[index + 1];
        nextInput.focus();
        nextInput.select();
      }
      if (value.length === 0 && index > 0) {
        const prevInput = inputRefs.current[index - 1];
        prevInput.focus();
        prevInput.select();
      } else if (index < numberOfInputs - 1 && value.length === 1) {
        const nextInput = inputRefs.current[index + 1];
        nextInput.focus();
        nextInput.select();
      }
      if (newOtpValues.filter((v) => v !== "").length === numberOfInputs) {
        const otp = newOtpValues.join("");
        setOTP(otp);
        setOtpState(otp);
      }
    }
  };

  const handlePaste = (e) => {
    const pastedValue = e.clipboardData.getData("text/plain");
    if (/^\d*$/.test(pastedValue) && pastedValue.length === numberOfInputs) {
      const newOtpValues = pastedValue.split("");
      setOtpValues(newOtpValues);
      const firstInput = inputRefs.current[0];
      firstInput.focus();
      firstInput.select();
      if (newOtpValues.filter((v) => v !== "").length === numberOfInputs) {
        const otp = newOtpValues.join("");
        setOTP(otp);
        setOtpState(otp);
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otpValues[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  useEffect(() => {
    setOtpValues(Array(numberOfInputs).fill(""));
    firstInputRef.current.focus(); // Set focus on the first input
  }, [resendDisabled]);
  useEffect(() => {
    if (otpState && otpValues.filter(Boolean).length > 5) {
      if (!authLoading && token) {
        setRingColor("ring ring-green-200 animate-shake");
        // setHz(true);
        const timeout = setTimeout(() => {
          setRingColor("");
        }, 4000);

        return () => clearTimeout(timeout);
      } else if (!authLoading && !token) {
        setRingColor("ring ring-red-200 animate-shake");
        setHz(true);
        dispatch({ type: "SET_AUTH_ID_TOKEN", payload: null });
        const timeout = setTimeout(() => {
          setRingColor("");
        }, 4000);

        return () => clearTimeout(timeout);
      }
    }

    setRingColor("");
    setHz(false);
  }, [token, authLoading, otpState, otpValues]);

  const [shakeCount, setShakeCount] = useState(0);
  useEffect(() => {
    if (hz) {
      setShakeCount(0);
    }
  }, [hz]);
  const shakeAnimation = useSpring({
    transform: hz
      ? `translateX(${shakeCount % 2 === 0 ? 5 : -5}px)`
      : "translateX(0)",
    config: {
      duration: 100,
    },
    onRest: () => {
      if (shakeCount < 9) {
        setShakeCount(shakeCount + 1);
      }
      if (shakeCount === 9) {
        setOtpValues(Array(numberOfInputs).fill(""));
        firstInputRef.current.focus(); // Set focus on the first input
      }
    },
  });
  return (
    <div className="flex w-full justify-center gap-2 lg:gap-4">
      {otpValues.map((value, index) => (
        <animated.input
          ref={(ref) => {
            inputRefs.current[index] = ref;
            if (index === 0) firstInputRef.current = ref; // Assign the first input ref
          }}
          className={`appearance-none no-spin-buttons ${ringColor} focus:ring w-12 h-14 border rounded text-center text-xl focus:outline-none`}
          key={index}
          id={`otpInput-${index}`}
          type="number"
          value={value}
          onKeyDown={(e) => handleKeyDown(e, index)}
          maxLength={1}
          onChange={(e) => handleChange(index, e.target.value)}
          onPaste={handlePaste}
          style={shakeAnimation}
          autoComplete="off"
        />
      ))}
    </div>
  );
};
export default OtpInputs;
