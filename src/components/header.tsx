import { Link } from "react-router-dom"
import { SignedOut, UserButton } from "@clerk/clerk-react"
// import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-transparent shadow-md backdrop-blur-sm">
        <nav className="max-w-4xl mx-auto py-2 px-4">
            <div className="flex justify-between items-center">
                <Link to="/" className="sm:text-lg text-sm font-logo font-bold"><span>🧑‍🍳</span>Let Him Cook<span>🍴</span></Link>
                <div className="flex">
                    <SignedOut>
                        <div className="md:space-x-4 space-x-2">
                            <Button variant="secondary"><Link to="/sign-in">Sign In</Link></Button>
                            <Button variant="default"><Link to="/sign-up">Sign Up</Link></Button>
                        </div>
                    </SignedOut>
                    <UserButton afterSwitchSessionUrl="/"/>
                </div>
            </div>
        </nav>
    </header>
  )
}

export default Header