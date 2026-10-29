import { auth } from "@/auth";
import Link from "next/link";
import Logoutbutton from "./Logoutbutton";
import Cartlink from "./Cartlink";

export default async function Navbar() {
    const session = await auth()
    return(
       
       <nav className="border-b border-zinc-800 bg-zinc-950 text-white shadow-lg">
         
             <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
            <Link    className="text-2xl font-bold tracking-wide text-yellow-500 transition hover:text-yellow-400" href="/">
              
             my app
            </Link>
           
            <div className="flex items-center gap-6">
                {session ? (
                    <>
                    <Cartlink/>
                    <Link className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:text-yellow-500" href="dashboard">{session.user.name}</Link>
                    <Logoutbutton/>
                    </>
                ):(
                    <>
                    <Cartlink/>
                    <Link className="font-medium text-zinc-300 transition hover:text-yellow-500" href="/login">login</Link>
                    <Link className="rounded-lg bg-yellow-500 px-4 py-2 font-bold text-black transition hover:bg-yellow-400" href="/register">register</Link>
                    </>
                )
                
                }
                
            </div>
       
            </div>
              
        </nav>
      
    )
}