import { Outlet } from "react-router"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"

export const Home = () => {
  return (
    <div className="container">
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}