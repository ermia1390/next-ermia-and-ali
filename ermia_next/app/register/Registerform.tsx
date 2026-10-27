"use client"

import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"


export default function Registerform(){
    const router=useRouter()
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [error,seterror]=useState("")
    const [loading,setloading]=useState(false)
    
    async function handlesubmit(
        event:React.SubmitEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        seterror("")
        setloading(true)
        try{
            const response=await fetch("/api/register",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({
                    username,
                    email,
                    password,
                }),
            })
            const data=await response.json()
            if(!response.ok){
                seterror(
                    data.message || "Registration completed successfully.",

                )
                return
            }
            const loginresult=await signIn(
                "credentials",
                {
                    email,
                    password,
                    redirect:false,},
            )
            if(!loginresult || loginresult.error){
                router.push("/login")
                return
            }
            router.push("/dashboard")
            router.refresh()
        }
        catch{
            seterror("Something went wrong. Please try again later.")
        }
        finally{
            setloading(false)
        }
    }
    return(
        <form onSubmit={handlesubmit} className="mx-auto mt-12 w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
            <h1 className="mb-8 text-center text-3xl font-bold text-yellow-500">register</h1>
            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">email</label>
                <input type="email" value={email} onChange={(event)=>setemail(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"  required/>
            </div>
            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">username</label>
                <input type="text" value={username} onChange={(event)=>setusername(event.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"  required/>
            </div>
            <div className="mb-5">
                <label className="mb-2 block text-sm font-medium text-zinc-300">password</label>
                <input type="password" value={password} onChange={(event)=>setpassword(event.target.value)}  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"   required/>
            </div>
            {error  &&(
                <p className="mb-5 rounded-xl border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-400">{error}</p>
            )}
            <button type="submit" disabled={loading} className="w-full rounded-xl bg-yellow-500 px-4 py-3 font-bold text-black transition hover:bg-yellow-400 disabled:cursor-not-allowed disabled:opacity-50">{loading ?"dar hal vorod":"Sign Up"}</button>
        </form>
    )

}