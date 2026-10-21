"use client"
import React, { createContext, useContext, useState } from "react"
type cartcontextprovidertype={
    children:React.ReactNode
}
type tcartitem={
    id:number,
    qty:number//تعداد 
}
type tcartcontext={
    cartitem:tcartitem[],
    handleincproduct:(id:number)=>void;//دکمه اضافه کردن
    handledecproduct:(id:number)=>void;//دکمه کم کردن محصول
    getproductqty:(id:number)=>number,//جمع خود محصول
    gettotalproductqty:number//جمع کل کالاهای سبد خرید
}
const cartcontext=createContext({} as tcartcontext)//فضای اشتراکی
export const usecreatecontext=()=>{//استفاده از فضای اشتراکی
    return(
        useContext(cartcontext)
    )
}
export function Cartcontextprovider({children}:cartcontextprovidertype){
    const[cartitem,setcartitem]=useState<tcartitem[]>([])
    const getproductqty=(id:number)=>{
        return cartitem.find((item)=>item.id==id)?.qty || 0;
    }
    const gettotalproductqty=cartitem.reduce((totalqty,item)=>{
        return totalqty + item.qty;
    },0)
    const handleincproduct=(id:number)=>{
        setcartitem((currentitem)=>{
            if(!(currentitem.find((item)=>item.id==id))){//اگه از این محصول از قبل در سبد خرید اضافه نشده بود
                return [...currentitem,{id:id ,qty:1}]
            }
            else{
                return currentitem.map((item)=>{//اگر از قبل بود یدونه بهش اضافه کن
                    if(item.id==id){
                        return{...item,qty:item.qty+1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
    }
    const handledecproduct=(id:number)=>{
        setcartitem((currentitem)=>{
            if(currentitem.find((item)=>item.id==id)?.qty==1){//اگر از آن محصول فقط یک عدد در سبد خرید وجود داشت کلا حذف شود
                return currentitem.filter(item=>item.id != id)
            }
            else{
                return currentitem.map((item)=>{
                    if(item.id==id){
                        return{...item,qty:item.qty-1}
                    }
                    else{
                        return item
                    }
                })
            }
        })
    }
    return(
        <cartcontext.Provider value={{cartitem,handledecproduct,handleincproduct,getproductqty,gettotalproductqty}}>
            {children}
        </cartcontext.Provider>
    )
}