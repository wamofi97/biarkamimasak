import { ThemeProvider } from "@/components/theme-provider"
import Home from "./routes/Home"
// import Header from "./components/header"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from "./routes/SignIn";
import SignUpPage from "./routes/SignUp";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/sign-in" element={<SignInPage/>} />
          <Route path="/sign-up" element={<SignUpPage/>} />
        </Routes>
      </Router>
    </ThemeProvider>
  )
}

export default App
