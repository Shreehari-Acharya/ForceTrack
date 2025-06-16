import ThemeToggle from "./theme-toggle"

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center p-4 shadow shadow-bottom shadow-foreground/15 shadow-md/90">
            <div className="text-3xl font-semibold">TLE - Analytics</div>
            <ThemeToggle />
        </nav>
    )
}