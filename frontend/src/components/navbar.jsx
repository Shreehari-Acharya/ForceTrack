import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"
import { FiSettings } from "react-icons/fi"

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 shadow shadow-bottom shadow-foreground/15 shadow-md/90">
            <div className="text-3xl font-semibold">TLE - Analytics</div>
            <div className="items-center flex space-x-2">
                <ThemeToggle />
                <Button variant={"outline"} className={"flex items-center"}>
                    <FiSettings className="h-3 w-3" />
                    Settings
                </Button>
            </div>
        </nav>
    )
}