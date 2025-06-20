import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"
import { FiSettings } from "react-icons/fi"
import { useNavigate, useLocation } from "react-router-dom"

export default function Navbar() {
    const navigate = useNavigate()
    const isSettingsPage = useLocation().pathname === "/settings"

    const handleClick = (e) => {
        e.preventDefault()
        if(isSettingsPage) {
            navigate("/")
        } else {
            navigate("/settings")
        }
    }
    return (
        <nav className="flex justify-between items-center p-4 shadow shadow-bottom shadow-foreground/15 shadow-md/90">
            <div className="text-3xl font-semibold">TLE - Analytics</div>
            <div className="items-center flex space-x-2">
                <ThemeToggle />
                <Button 
                    variant={"outline"}
                    className={"flex items-center"}
                    onClick={handleClick}    
                >
                    {isSettingsPage ? (
                        <>
                            <FiSettings className="h-3 w-3" />
                            Dashboard
                        </>
                    ) : (
                        <>
                            <FiSettings className="h-4 w-4" />
                            Settings
                        </>
                    )}
                </Button>
            </div>
        </nav>
    )
}