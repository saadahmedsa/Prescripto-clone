"use client"

import { UserButton } from "@clerk/nextjs"
import { AlignJustify,  } from "lucide-react"



export default function Header({ toggleSidebar }) {
    

  
    return (
        <header className="bg-background border-b-2 border-[#6A61F5] shadow p-4 flex items-center justify-between ">

            <div className="flex gap-2 items-center">
                <button onClick={toggleSidebar} className="lg:hidden block mr-2">
                    <AlignJustify size={32} />
                </button>
            </div>
            <h1 className="text-xl font-semibold ">Admin Panel</h1>
            <div>
              <UserButton/>
            </div>
        </header>
    )
}
