import { UserButton } from "@clerk/nextjs"
import Link from "next/link"

function TopNavigation() {
    return (
        <div className="navbar bg-neutral-900 bg-opacity-95 shadow-0">
  <div className="flex-1">
    <Link href="/" className="px-4 py-2 font-medium cursor-pointer bg-neutral-900 bg-opacity-95 border-none hover:bg-neutral-900 text-xl text-success-content">Movie</Link>
  </div>
  <div className="flex-none">
    
    <UserButton/>
  </div>
</div>
    )
}

export default TopNavigation
