import { LogOut, MessageSquare, Settings, User } from "lucide-react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { AuthContext } from "../Hooks/useAuth"

function Navbar() {
  const {Logout , authUser} = useContext(AuthContext)
  return (
    <nav className="w-full bg-base-100 border-b backdrop-blur-lg border-base-300">
      <div className="container px-5 mx-auto  h-16">
          <div className="flex justify-between items-center h-full">
            <div className="flex gap-3  justify-center items-center">
              <Link to={"/"} className="flex justify-center items-center gap-3">
                  <div className="w-9 h-9 bg-primary/10 rounded-lg flex justify-center items-center">
                    <MessageSquare className="text-primary"/>
                  </div>
                  <h1 className="text-lg font-bold">Chatty</h1> 
              </Link>
            </div>
            <div className="flex gap-3  justify-center items-center p-2">
              <Link className="flex btn btn-sm transition-colors justify-center items-center ">
                    <Settings className="h-4 w-4 text-white"/>
                  <span className="hidden sm:inline  font-medium">Setting</span> 
              </Link>
        {authUser &&
        (      
          <>
                  <Link to={"/profile"} className="flex btn btn-sm transition-colors justify-center items-center ">
          <User className="h-4 w-4 text-white"/>
          <span className="hidden sm:inline  font-medium">Profile</span> 
        </Link> 
      <button onClick={Logout} className="flex btn btn-sm transition-colors justify-center items-center ">
            <LogOut className="h-4 w-4 text-white"/>
          <span className=" hidden sm:inline font-medium">Logout</span> 
      </button>

          </>
    )
        }
            </div>
          </div>
      </div>
    </nav>
  )
}

export default Navbar