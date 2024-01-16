import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Spinner from './Spinner'

function LoadingStatuse({request_data,child,request_running,error,message}) {
useEffect(()=>{
},[])
const sucess_message = useSelector((state)=>state.transfer.sucess_message)

    return (
      <>
  {request_data&&request_data.language_code===child.language_code&&
  <div className='status-container'>
    

    {request_data&&request_data.language_code===child.language_code&&
      <>{request_running?
      <div className='spinner-loading'><Spinner/></div>
      :<>{error?<div className='error-status'>
                  <div className="error-container">
                  <div className="error-icon">
                      <svg id="_15x15_photo_back" data-name="15x15 photo back" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="15" height="15" viewBox="0 0 15 15">
                      <g id="Mask_Group_128" data-name="Mask Group 128">
                        <g id="Layer_1" transform="translate(-0.5 -0.5)">
                          <path id="Path_18928" data-name="Path 18928" d="M8,.5A7.5,7.5,0,1,0,15.5,8,7.5,7.5,0,0,0,8,.5Zm0,12a1,1,0,1,1,1-1A1,1,0,0,1,8,12.5ZM9.145,4.745,8.81,8.755a.813.813,0,0,1-1.62,0l-.335-4.01A1.149,1.149,0,1,1,9.15,4.65a.605.605,0,0,1-.005.095Z" fill="#ff6174"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div className="error-cont">
                  <div className='text-error'>
                    {message}
                    </div>
                  </div>
                  </div>
      </div>
      :<div className='success-status' style={{color:"green"}}>
        <svg xmlns="http://www.w3.org/2000/svg" width="65" height="15" viewBox="0 0 65 15">
          <text id="successfully" transform="translate(0 11)" fill="#34c16a" font-size="8" font-family="SegoeUI, Segoe UI" letter-spacing="0.025em"><tspan x="0" y="0">{sucess_message&&sucess_message.length>0?sucess_message:"Successfully"}</tspan></text>
          <g id="Group_7623" data-name="Group 7623" transform="translate(-163 -197)">
            <g id="Group_7622" data-name="Group 7622">
              <g id="Group_7621" data-name="Group 7621">
                <path id="Path_18912" data-name="Path 18912" d="M7.5,3.2a.531.531,0,0,1-.531-.531V.531a.531.531,0,1,1,1.062,0V2.67A.531.531,0,0,1,7.5,3.2Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18913" data-name="Path 18913" d="M7.5,15a.531.531,0,0,1-.531-.531V12.33a.531.531,0,0,1,1.062,0v2.14A.531.531,0,0,1,7.5,15Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18914" data-name="Path 18914" d="M10.134,14.483a.531.531,0,0,1-.492-.33l-.809-1.981a.531.531,0,0,1,.983-.4l.809,1.981a.531.531,0,0,1-.491.732Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18915" data-name="Path 18915" d="M9.325,3.56a.531.531,0,0,1-.491-.732L9.642.847a.531.531,0,0,1,.983.4L9.817,3.229A.531.531,0,0,1,9.325,3.56Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18927" data-name="Path 18927" d="M10.133,3.561a.531.531,0,0,0,.491-.732L9.816.847a.531.531,0,1,0-.982.4l.808,1.982A.531.531,0,0,0,10.133,3.561Z" transform="translate(208.541 197)" fill="#00c426"/>
                <path id="Path_18916" data-name="Path 18916" d="M4.866,14.483a.531.531,0,0,1-.491-.732l.809-1.981a.531.531,0,0,1,.983.4l-.809,1.981A.531.531,0,0,1,4.866,14.483Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18917" data-name="Path 18917" d="M1.048,10.665a.531.531,0,0,1-.2-1.023l1.981-.809a.531.531,0,1,1,.4.983l-1.981.809A.529.529,0,0,1,1.048,10.665Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18918" data-name="Path 18918" d="M11.972,6.206a.531.531,0,0,1-.2-1.023l1.981-.809a.531.531,0,1,1,.4.983l-1.981.809A.529.529,0,0,1,11.972,6.206Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18919" data-name="Path 18919" d="M3.028,6.206a.529.529,0,0,1-.2-.04L.847,5.358a.531.531,0,1,1,.4-.983l1.981.809a.531.531,0,0,1-.2,1.023Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18920" data-name="Path 18920" d="M13.952,10.665a.529.529,0,0,1-.2-.04l-1.981-.809a.531.531,0,1,1,.4-.983l1.981.809a.531.531,0,0,1-.2,1.023Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18921" data-name="Path 18921" d="M10.915,4.616a.531.531,0,0,1-.375-.906L12.052,2.2a.531.531,0,0,1,.751.751L11.29,4.46A.529.529,0,0,1,10.915,4.616Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18922" data-name="Path 18922" d="M2.572,12.959a.531.531,0,0,1-.375-.906L3.71,10.54a.531.531,0,0,1,.751.751L2.948,12.8a.529.529,0,0,1-.375.156Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18923" data-name="Path 18923" d="M4.085,4.616A.529.529,0,0,1,3.71,4.46L2.2,2.948A.531.531,0,0,1,2.948,2.2L4.46,3.71a.531.531,0,0,1-.375.906Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18924" data-name="Path 18924" d="M12.428,12.959a.529.529,0,0,1-.375-.156L10.54,11.29a.531.531,0,0,1,.751-.751L12.8,12.052a.531.531,0,0,1-.375.906Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18925" data-name="Path 18925" d="M2.67,8.031H.531a.531.531,0,1,1,0-1.062H2.67a.531.531,0,1,1,0,1.062Z" transform="translate(213 197)" fill="#00c426"/>
                <path id="Path_18926" data-name="Path 18926" d="M14.469,8.031H12.33a.531.531,0,0,1,0-1.062h2.139a.531.531,0,0,1,0,1.062Z" transform="translate(213 197)" fill="#00c426"/>
                <rect id="Rectangle_4561" data-name="Rectangle 4561" width="15" height="15" transform="translate(213 197)" fill="none"/>
              </g>
            </g>
          </g>
        </svg>
      </div>}
      </>}</>
          }
          </div>}
          </>
  )
}

export default LoadingStatuse