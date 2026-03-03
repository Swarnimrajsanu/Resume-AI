import { useAuth } from "../../auth/hooks/useAuth"

function Home() {
    const { user, handleLogout } = useAuth()

    return (
        <main>
            <div className="form-container">
                <h2>Welcome, {user?.username}!</h2>
                <p>You are logged in as <strong>{user?.email}</strong></p>
                <button className="btn-primary btn-block" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </main>
    )
}

export default Home
