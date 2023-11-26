export default function Logout() {
    const logout = () => {

    }

    return (
        <p className="user">
            {user.fullName} connected !! 
            <button className="logout" onClick={logout}>התנתק</button>
        </p>
    )
}