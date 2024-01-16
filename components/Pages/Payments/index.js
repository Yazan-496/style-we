"use client"
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Header from "components/Header/desktop";
import Footer from "components/Footer/desktop";
import Head from "next/head";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RightSideChat from "components/common/RightSideChat";
import DoneComponent from "components/PaymentMethod/DoneComponent";

const StatusPayment = () => {
  const dispatch = useDispatch()
  const param = useParams()
  const router = useRouter()
  const SearchParam = useSearchParams()
  const { type, status, params  } = param
  const orderId = SearchParam?.get("order_id")
  const statusOrder = SearchParam?.get("status")
  const SuccessPayment = useSelector((state => state?.CheckoutReducer?.SuccessPayment))
  // success ? customer_info?.starting_setting -> telr_success_url
  // success ? customer_info?.starting_setting -> post_pay_success_url
  // console.log(type, status, statusOrder, orderId)
  useEffect(() => {
    if (type === "postpay"){
      dispatch({type: "CONFIRM_PAYMENT", payload: {type, statusOrder, orderId}})
    }
    if (type === "telr"){
      dispatch({type: "CONFIRM_PAYMENT", payload: {type}})
    }
  }, [status, type])
//   useEffect(() => {
//     if (SuccessPayment){
// router?.push("/orders-list/all")    }
//   }, [SuccessPayment])
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return  <>
    <Head>
      <title>Payment Methods</title>
    </Head>
    <Header checkout={true}/>
    <div className="pt-0 lg:pt-[140px] h-[90vh] flex items-center justify-center relative w-full lg:min-w-[1024px] bg-gray-50">
        <DoneComponent />
    </div>
    {/* <RightSideChat /> */}
    {/* <Footer /> */}
    <div id="modal-root"></div>
  </>
}
export default StatusPayment