import React, { useEffect, useRef, useState } from 'react'

export default function GoogleAd({adClient = "ca-pub-1234567890123456",adSlot="1234567890"}) {
    const adRef = useRef(null)
    const [showFallBack ,setShowFallBack] = useState(false)
    useEffect(()=>{
      const fallBackTimer = setTimeout(()=>{
        if(adRef.current &&  adRef.current.hasAttribute('data-adsbygoogle-status')){
            setShowFallBack(true)
        }
      })
        try{
            if(adRef.current && window.adsbygoogle && adRef.current.hasAttribute('data-adsbygoogle-status')){

                (window.adsbygoogle =window.adsbygoogle || []).push({});
            }
        }catch(error){
            console.log(error);
            
        }
        return () =>{
          clearTimeout(fallBackTimer)
        }
    },[])
    const fallBackBoxStyle ={
        margin:'20px auto',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        background:'#f3f4f6',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        zIndex:1
    }
  return (
    <div style={{ margin:'20px auto' }}>
        {showFallBack && (
            <div className="" style={fallBackBoxStyle}>
                <strong style={{ color:"#10b981" }}>[GOOGLE AD PLACEHOLDER ]</strong>
                <span>Client :{adClient}</span>
                <span>Slot :{adSlot}</span>
                <span className='mt-5'>
                    (STructure and positioning Verification)
                </span>
            </div>
        )}
      <ins 
      ref={adRef}
       className='adsbygoogle'       s
       style={{ display:"block" , minWidth:"300px",background:'#f8f9fa' }}
       data-ad-client = {adClient}
       data-add-slot={adSlot}
       data-ad-format="auto"
       data-full-width-responsive="true"
      />
    </div>
  )
}
