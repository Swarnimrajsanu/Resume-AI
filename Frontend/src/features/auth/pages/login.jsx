import { useState } from "react"
import { Link, useNavigate } from "react-router"
import "../auth.form.scss"
import { useAuth } from "../hooks/useAuth"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { handleLogin } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    try {
      await handleLogin({ email, password })
      navigate("/")
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password")
    }
  }

  return (
    <main>
      <div className="form-container">
        <h2>Login</h2>

        {error && <p style={{ color: "#e1034d" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary btn-block">Login</button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  )
}

export default Login
