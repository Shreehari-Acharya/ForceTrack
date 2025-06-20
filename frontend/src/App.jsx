import { ThemeProvider } from "components/theme-provider"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "pages/dashboard"
import StudentDetails from "pages/studentDetails"
import Navbar from "components/navbar"
import { Toaster } from "./components/ui/sonner"
import Settings from "./pages/settings"

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <div className="min-h-screen">
          <Navbar/>
          <main className="mt-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/student/:id" element={<StudentDetails />} />
              <Route path="/settings" element={<Settings/>} />
            </Routes>
          </main>
          <Toaster/>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
