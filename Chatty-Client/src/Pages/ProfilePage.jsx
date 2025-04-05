import { Mail, User } from "lucide-react"
import ProfileAvatar from "../assets/user(1).png"
import { useContext } from "react"
import { AuthContext } from "../Hooks/useAuth"
function ProfilePage() {
  const {authUser } = useContext(AuthContext)

  return (
    <div className="min-h-screen bg-base-300 rounded-2xl mt-10 max-w-2xl mx-auto">
          <div className="text-center p-5">
              <h1 className="text-3xl">Profile</h1>
              <p className="text-base-content/60">Yout Profile Details</p>
          </div>
          <div className="flex flex-col justify-center items-center">
          <div className="size-35 text-center flex justify-center items-center rounded-full bg-base-200">
              <img src={ProfileAvatar} alt="" />
          </div>
              <div className="m-2">
              <p className="text-base-content/30">Click Here To Change Your Profile Picture</p>
              </div>
          <div className="space-y-1.5 px-10 w-full mb-2">
              <div className="flex items-center gap-1  text-base-content/60 ">
                <User className="w-4 h-4" />
                  User Name
              </div>
              <p className="px-2.5 py-1.5 rounded text-base-content/50   bg-base-200 rounded-ls border">{authUser?.name}</p>
          </div>
          <div className="space-y-1.5 px-10 w-full">
              <div className="flex items-center gap-1   text-base-content/60 ">
                <Mail className="w-4 h-4" />
                  Email
              </div>
              <p className="px-2.5 py-1.5 rounded text-base-content/50 bg-base-200 rounded-ls border">{authUser?.email}</p>
          </div>
          <div className="space-y-1.5 px-10 w-full mt-2.5 ">
              <h2 className="text-lg font-medium">Account Information</h2>
              <div className="flex border-b-1 border-base-content/10 justify-between items-center">
                <span className="text-base-content/50">Member Since</span>
                <span className="text-base-content/50">{authUser?.created_at.split("T")[0]}</span>
              </div>
              <div className="flex border-b-1 border-base-content/10 justify-between items-center">
                <span className="text-base-content/50">Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
          </div>
          </div>

    </div>
  )
}

export default ProfilePage