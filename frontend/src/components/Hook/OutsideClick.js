import { useEffect } from "react";

export default function OutsideClick(ref,close){
    useEffect(function(){
        function handleClick(e)
         {
            if(ref.current&&!ref.current.contains(e.target))
             {
                 close();
             }
         }
       document.addEventListener('click',handleClick,true);
       ()=>{
         document.removeEventListener('click',handleClick) 
       }
     },[close])
   
}