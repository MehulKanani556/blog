import React, { useEffect, useRef } from 'react'

export default function GoogleAd({adClient = "ca-pub-1234567890123456",adSlot="1234567890"}) {
    const adRef = useRef(null)
    useEffect(()=>{
        let isMounted = true;

        try{
            if(adRef.current && window.adsbygoogle && adRef.current.hasAttribute('data-adsbygoogle-status')){

                (window.adsbygoogle =window.adsbygoogle || []).push({});
            }
        }catch(error){
            console.log(error);
            
        }
        return () =>{
            isMounted = false;
        }
    },[])
  return (
    <div style={{ margin:'20px auto' }}>
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
