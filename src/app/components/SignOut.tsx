"use client";

import { signOut } from "next-auth/react"

export default function SignOut() {
    return <button className="cursor-pointer hover:text-blue-400 transition-colors duration-200" onClick={() => signOut()}>Sign out</button>
}
