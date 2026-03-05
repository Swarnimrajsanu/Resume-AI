import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { useAuth } from "../../auth/hooks/useAuth"
import { useInterview } from "../hooks/useInterview"
import "../style/Home.scss"

function Home() {
    const { loading, reports, generateReport } = useInterview()
    const { user, handleLogout } = useAuth()
    const navigate = useNavigate()

    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [resumeFile, setResumeFile] = useState(null)
    const [formOpen, setFormOpen] = useState(false)
    const [profileOpen, setProfileOpen] = useState(false)

    const getScoreClass = (score) => {
        if (score >= 70) return "high"
        if (score >= 40) return "medium"
        return "low"
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const report = await generateReport({ jobDescription, selfDescription, resumeFile })
            if (report?._id) {
                navigate(`/interview/${report._id}`)
            }
        } catch (err) {
            console.error("Failed to generate report:", err)
        }
    }

    const onLogout = async () => {
        await handleLogout()
        navigate("/login")
    }

    const getInitials = (name) => {
        if (!name) return "U"
        return name.split(" ").map(w => w[0]).join("").toUpperCase().slice(0, 2)
    }

    return (
        <div className="home-page">
            {loading && (
                <div className="loading-overlay">
                    <div className="spinner" />
                    <p>Generating your interview report...</p>
                </div>
            )}

            <div className="home-header">
                <h1>
                    Interview <span>Prep</span>
                </h1>
                <div className="header-actions">
                    <button
                        className={formOpen ? "btn-secondary" : "btn-primary"}
                        onClick={() => setFormOpen(!formOpen)}
                    >
                        {formOpen ? "✕ Cancel" : "＋ New Report"}
                    </button>

                    {/* User Profile */}
                    <div className="user-profile">
                        <button
                            className="profile-avatar"
                            onClick={() => setProfileOpen(!profileOpen)}
                        >
                            {getInitials(user?.username)}
                        </button>

                        {profileOpen && (
                            <>
                                <div className="profile-backdrop" onClick={() => setProfileOpen(false)} />
                                <div className="profile-dropdown">
                                    <div className="profile-info">
                                        <div className="profile-avatar-lg">
                                            {getInitials(user?.username)}
                                        </div>
                                        <div className="profile-details">
                                            <p className="profile-name">{user?.username || "User"}</p>
                                            <p className="profile-email">{user?.email || ""}</p>
                                        </div>
                                    </div>
                                    <div className="profile-divider" />
                                    <button className="logout-btn" onClick={onLogout}>
                                        🚪 Logout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {formOpen && (
                <div className="new-report-section">
                    <h2>
                        <span className="icon">📝</span>
                        Generate Interview Report
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <label>Upload Resume (PDF)</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={(e) => setResumeFile(e.target.files[0])}
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="input-group">
                                <label>Self Description</label>
                                <textarea
                                    placeholder="Describe yourself, your experience, and what you bring to the table..."
                                    value={selfDescription}
                                    onChange={(e) => setSelfDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <label>Job Description</label>
                                <textarea
                                    placeholder="Paste the job description you're preparing for..."
                                    value={jobDescription}
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-actions">
                            <button type="submit" className="btn-primary btn-lg" disabled={loading}>
                                {loading ? "Generating..." : "🚀 Generate Report"}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="reports-section">
                <h2>
                    <span className="icon">📊</span>
                    Your Reports
                    <span className="count">({reports.length})</span>
                </h2>

                {reports.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">📋</div>
                        <p>No interview reports yet. Create your first one!</p>
                    </div>
                ) : (
                    <div className="reports-grid">
                        {reports.map((report) => (
                            <Link
                                to={`/interview/${report._id}`}
                                key={report._id}
                                className="report-card"
                            >
                                <div className="card-header">
                                    <h3>{report.title}</h3>
                                    <span className={`match-badge ${getScoreClass(report.matchScore)}`}>
                                        {report.matchScore}%
                                    </span>
                                </div>
                                <span className="card-date">
                                    {formatDate(report.createdAt)}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Home
