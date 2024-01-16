import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"
import styled, { keyframes, css } from "styled-components"
import ModalOrderBody from "./ModalReturnBody"
import LoadingComponent from "../../../../LoadingComponent/desktop"
import { useDispatch, useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import Link from "../../../../../helpers/Link"
import { SvgLoader } from "../../../../svgs"
import Loading from "../../../../Loading";

const ReturnModal = ({
        show,
        onClose,
        order,
        isEdit,
        widthModal,
        type,
        padding,
}) => {
        const dispatch = useDispatch()
        const [isBrowser, setIsBrowser] = useState(false)
        const [loading, setLoading] = useState(true)
        const checkoutLoading = useSelector(
                state => state?.CheckoutReducer?.cartProduct
        )
        const closeModalProductReturn = useSelector(
                state => state?.CheckoutReducer?.closeModalProductReturn
        )
        const orderReturnDetails = useSelector(
                state => state?.CheckoutReducer?.orderReturnDetails
        )
        useEffect(() => {
                setIsBrowser(true)
                show
                        ? (document.body.style.overflow = "hidden")
                        : (document.body.style.overflow = "unset")
        }, [show])
        useEffect(() => {
                setTimeout(() => setLoading(false), 3000)
        }, [show])

        const handleCloseClick = e => {
                e.preventDefault()
                onClose()
                dispatch({ type: "GET_ORDERS_SAGA" })
                dispatch({type: "RESET_RETURN_ORDER_DETAILS_REDUCER"})
                setLoading(true)
        }

        const [showToast, setShowToast] = useState({})
        const _closeAfterSuccess = () => {
                if (closeModalProductReturn) {
                        onClose()
                        dispatch({ type: "GET_ORDERS_SAGA" })
                        dispatch({type: "RESET_RETURN_ORDER_DETAILS_REDUCER"})
                        setLoading(true)
                        dispatch({
                                type: "RESET_RETURN_PRODUCT",
                        })
                }
        }

        useEffect(() => {
                if (closeModalProductReturn) {
                        // _closeAfterSuccess()
                }
        }, [closeModalProductReturn, checkoutLoading])
        useEffect(() => {
        }, [order])

        function handleClose() {
                dispatch({
                        type: "REMOVE_PRODUCT_CART",
                        payload: null,
                })
        }

        const { t, i18n } = useTranslation("translation")

        function handleConfirmReturnRequest() {
                if (order?.return_request_id) {
                        dispatch({
                                type: "CONFIRM_RETURN_REQUEST",
                                payload: {
                                        returnRequestId:
                                                order?.return_request_id,
                                },
                        })
                }
        }

        const modalContent = show ? (
                <StyledModalOverlay isModalOpen={show}>
                        <ModalContainer className="pt-10 lg:pt-0 w-full" isModalOpen={show}>
                                <StyledModal className="w-full lg:w-[70%]" widthModal={widthModal}>
                                        <StyledModalHeader>
                                                <div />
                                                <div className="text-gray-900 text-lg leading-6 ">
                                                        {`${type} Return Request`}
                                                </div>
                                                <div className="cursor-pointer"
                                                        onClick={
                                                                handleCloseClick
                                                        }
                                                >
                                                        x
                                                </div>
                                        </StyledModalHeader>
                                        <StyledModalBody>
                                                {!checkoutLoading ? (
                                                        <ModalOrderBody
                                                                orderReturnDetails={
                                                                        orderReturnDetails
                                                                }
                                                                setLoading={() =>
                                                                        setLoading(
                                                                                true
                                                                        )
                                                                }
                                                                order={order}
                                                                type={type}
                                                                padding={
                                                                        padding
                                                                }
                                                        />
                                                ) : (
                                                        <LoadingComponent />
                                                )}
                                        </StyledModalBody>
                                        {/*{*/}
                                        {/*        orderReturnDetails?.total_returnable_amount >*/}
                                        {/*        0 &&*/}
                                        {/*        !orderReturnDetails?.return_request_destination_id &&*/}
                                        {/*        (*/}
                                        {/*            <StyledModalFooter>*/}
                                        {/*                    <button*/}
                                        {/*                        onClick={*/}
                                        {/*                                handleConfirmReturnRequest*/}
                                        {/*                        }*/}
                                        {/*                        className="cm-btn-primary bg-black flex justify-center items-center flex-grow-0 flex-shrink-0 w-[448px] h-21 relative overflow-hidden gap-1 px-3 py-2 rounded disabled:bg-[#F2F2F3] disabled:text-[#CED0D3] disabled:cursor-not-allowed"*/}
                                        {/*                    >*/}
                                        {/*                            <p className=" text-white text-[18px] leading-[21px] font-bold">*/}
                                        {/*                                    {checkoutLoading ? (*/}
                                        {/*                                        <p className=" flex-grow-0 flex-shrink-0 text-lg font-bold">*/}
                                        {/*                                                <SvgLoader />*/}
                                        {/*                                        </p>*/}
                                        {/*                                    ) : (*/}
                                        {/*                                        t(*/}
                                        {/*                                            "user.confirm"*/}
                                        {/*                                        )*/}
                                        {/*                                    )}*/}
                                        {/*                            </p>*/}
                                        {/*                    </button>*/}
                                        {/*            </StyledModalFooter>*/}
                                        {/*        )}*/}
                                </StyledModal>
                        </ModalContainer>
                </StyledModalOverlay>
        ) : null

        if (isBrowser) {
                return ReactDOM.createPortal(
                        modalContent,
                        document.getElementById("modal-root")
                )
        } else {
                return null
        }
}
const StyledModalFooter = styled.div`
        display: flex;
        padding: 10px;
        justify-content: center;
        justify-items: center;
        position: absolute;
        bottom: 0;
        //left: 0;
        width: -webkit-fill-available;
        background-color: white; /* أو اللون الذي تفضله للخلفية */
`
const StyledModalBody = styled.div`
        padding-top: 10px;
`
const shrinkOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
`
const zoomIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const zoomInOverlay = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const zoomOutOverlay = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0);
  }
`
const StyledModalHeader = styled.div`
        display: flex;
        justify-content: space-between;
        font-size: 25px;
        border-bottom: 1px solid rgb(231, 231, 231);
        margin: 0px;
`
const ModalContainer = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1111;
        opacity: 1111;
        display: flex;
        justify-content: end;
        align-items: end;
        animation: ${({ isModalOpen }) =>
                isModalOpen
                        ? css`
                                  ${zoomIn} 0.4s ease-in-out forwards
                          `
                        : css`
                                  ${shrinkOut} 0.4s ease-in-out forwards
                          `};
`

const StyledModal = styled.div`
        background: white;
        overflow: auto;
        width: ${props => props.widthModal};
        height: 100%;
        min-width: 70%;
        border-radius: 5px;
        padding: 15px;
        z-index: 1111;
        opacity: 1111;
`
const StyledModalOverlay = styled.div`
        position: fixed;
        display: flex;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: ${({ isModalOpen }) => (isModalOpen ? 1111 : 0)};
        overflow: auto;
        justify-content: end;
        align-items: end;
        background-color: ${({ isModalOpen }) =>
                isModalOpen ? "rgba(0, 0, 0, 0.5)" : "transparent"};
        transition: all 0.4s ease-in-out;
`

export default ReturnModal
