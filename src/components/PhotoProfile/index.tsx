import { useAuth } from "../../hooks/useAuth"

export function PhotoProfile(){

    const { logout } = useAuth()

    return (
        <div className="h-10 w-10 rounded-full cursor-pointer overflow-hidden" onClick={logout}>
            <img src="https://avatars.githubusercontent.com/u/90568558?s=96&v=4" className="h-10 w-10 rounded-full" alt="photo profile" />
        </div>
    )
}