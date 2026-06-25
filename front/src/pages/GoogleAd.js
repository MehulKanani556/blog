import React, { useEffect } from 'react'

export default function GoogleAd({adClient = "ca-pub-1234567890123456",adSlot="1234567890"}) {
    useEffect(()=>{
        try{
            (window.adsbygoogle =window.adsbygoogle || []).push({});
        }catch(error){
            console.log(error);
            
        }
    })
  return (
    <div style={{ margin:'20px auto' }}>
      <ins 
       className='adsbygoogle'
       style={{ display:"block" }}
       data-ad-client = {adClient}
       data-add-slot={adSlot}
       data-ad-format="auto"
       data-full-width-responsive="true"
      />
    </div>
  )
}
