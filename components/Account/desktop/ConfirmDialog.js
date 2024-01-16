import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { forwardRef, useEffect } from "react";
import Slide from "@mui/material/Slide";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});
const ConfirmDialog = ({
  handleCancelDelete,
  handleConfirmDelete,
  isOpen,
  message,
  refresh,
  setRefresh
}) => {
  return (
    <div className="items-center z-[9999] bg-[rgba(0,0,0,0.4)] flex h-full justify-center left-0 fixed top-0 w-full">
      <div className="bg-transparent p-4 flex items-center justify-center h-full w-full">
        <div className="p-5 flex flex-col absolute max-h-[80vh]">
          <div className="bg-white h-auto w-full rounded">
            <div className="p-4 m-0 flex flex-shrink-0 text-center">
              <h4 className="leading-6 text-gray-900 text-lg pl-8">
                {message}
              </h4>
              {/* <svg aria-hidden="true" className="icon close-button">
                <use href="#baseline-close-px" />
              </svg> */}
            </div>
            <div className="overflow-y-auto relative" />
            <div className="p-4 bg-gray-50 justify-center p-4 flex h-16 mb-2">
              <button
                onClick={handleCancelDelete}
                className="w-full h-full bg-transparent mr-5 flex items-center justify-center bg-white text-black cursor-pointer text-xs font-semibold max-w-full overflow-hidden relative text-center no-underline uppercase whitespace-no-wrap"
              >
                <div className="hover:underline w-full max-w-full inline-block pointer-events-none overflow-hidden whitespace-no-wrap">
                  Cancel
                </div>
              </button>
              <button
                onClick={async () => {
                  handleConfirmDelete() 
                  // const aa = await window.setTimeout(() => {
                    setRefresh(!refresh)
                  // }, 3000);
                  // aa()
                }}
                className="w-full bg-gray-800 border-gray-800 text-white h-10 ml-0 flex items-center justify-center cursor-pointer text-xs font-semibold max-w-full overflow-hidden relative text-center no-underline uppercase whitespace-no-wrap"
              >
                <div className="hover:underline inline-block pointer-events-none overflow-hidden whitespace-no-wrap max-w-full">
                  Confirm
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
