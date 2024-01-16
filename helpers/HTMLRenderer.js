import React from "react";
import { LoaderCategory } from "./Loader/Loading";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { TransClient } from "./TransClient";

const HTMLRenderer = ({ htmlContent, overFlow }) => {
  const router = useRouter()
  useEffect(() => {
    router.refresh()
  }, [])
  
  return (
    <div
      className={`${overFlow ? "flex justify-between space-x-2" : "overflow-y-scroll  max-h-screen lg:max-h-[300px]"}`}
    >
      {htmlContent ? (
        <div dir={TransClient("user.dir")} dangerouslySetInnerHTML={{ __html: htmlContent }} />
      ) : (
        <div dir={TransClient("user.dir")} className="flex justify-center w-fit items-center">
          <LoaderCategory />
        </div>
      )}
    </div>
  );
};

export default HTMLRenderer;
