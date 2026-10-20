"use client"


import { signOut } from "next-auth/react"


export default function Logoutbutton(){
    return(
        <button className="rounded-lg border border-yellow-600/40 bg-zinc-900 px-5 py-2.5 font-medium text-yellow-500 shadow-md transition hover:border-yellow-500 hover:bg-zinc-800 hover:text-yellow-400" onClick={()=>signOut({callbackUrl:"/login"})}>logout</button>
    )
}