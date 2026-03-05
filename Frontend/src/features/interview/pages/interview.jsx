import { useState } from "react"
import { Link } from "react-router"
import { useInterview } from "../hooks/useInterview"
import "../style/interview.scss"

const SECTIONS = [
    { id: "technical", label: "Technical Questions", icon: "💻" },
    { id: "behavioral", label: "Behavioral Questions", icon: "🤝" },
    { id: "skillgaps", label: "Skill Gaps", icon: "⚠️" },
    { id: "preparation", label: "Preparation Plan", icon: "🗓️" },
]

function InterviewReport() {
    const { loading, report, getResumePdf } = useInterview()
    const [activeSection, setActiveSection] = useState("technical")

    const getScoreClass = (score) => {
        if (score >= 70) return "high"
        if (score >= 40) return "medium"
        return "low"
    }

    const formatDate = (dateStr) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric"
        })
    }

    if (loading || !report) {
        return (
            <div className="interview-report-page">
                <div className="report-loading">
                    <div className="spinner" />
                    <p>Loading report...</p>
                </div>
            </div>
        )
    }

    const renderContent = () => {
        switch (activeSection) {
            case "technical":
                return (
                    <div className="section-content">
                        <div className="section-title">
                            <span className="icon">💻</span>
                            <h2>Technical Questions</h2>
                            <span className="count-badge">{report.technicalQuestions?.length || 0}</span>
                        </div>
                        <div className="qa-list">
                            {report.technicalQuestions?.map((q, i) => (
                                <div className="qa-card" key={i}>
                                    <p className="qa-question">{i + 1}. {q.question}</p>
                                    <p className="qa-intention">{q.intention}</p>
                                    <p className="qa-answer">{q.answer}</p>
                                </div>
                            ))}
                            {(!report.technicalQuestions || report.technicalQuestions.length === 0) && (
                                <p className="empty-section">No technical questions available.</p>
                            )}
                        </div>
                    </div>
                )
            case "behavioral":
                return (
                    <div className="section-content">
                        <div className="section-title">
                            <span className="icon">🤝</span>
                            <h2>Behavioral Questions</h2>
                            <span className="count-badge">{report.behavioralQuestions?.length || 0}</span>
                        </div>
                        <div className="qa-list">
                            {report.behavioralQuestions?.map((q, i) => (
                                <div className="qa-card" key={i}>
                                    <p className="qa-question">{i + 1}. {q.question}</p>
                                    <p className="qa-intention">{q.intention}</p>
                                    <p className="qa-answer">{q.answer}</p>
                                </div>
                            ))}
                            {(!report.behavioralQuestions || report.behavioralQuestions.length === 0) && (
                                <p className="empty-section">No behavioral questions available.</p>
                            )}
                        </div>
                    </div>
                )
            case "skillgaps":
                return (
                    <div className="section-content">
                        <div className="section-title">
                            <span className="icon">⚠️</span>
                            <h2>Skill Gaps</h2>
                            <span className="count-badge">{report.skillGaps?.length || 0}</span>
                        </div>
                        <div className="skill-gaps-list">
                            {report.skillGaps?.map((gap, i) => (
                                <div className={`skill-chip ${gap.severity}`} key={i}>
                                    <span className="severity-dot" />
                                    <span className="skill-name">{gap.skill}</span>
                                    <span className="severity-label">{gap.severity}</span>
                                </div>
                            ))}
                            {(!report.skillGaps || report.skillGaps.length === 0) && (
                                <p className="empty-section">No skill gaps identified.</p>
                            )}
                        </div>
                    </div>
                )
            case "preparation":
                return (
                    <div className="section-content">
                        <div className="section-title">
                            <span className="icon">🗓️</span>
                            <h2>Preparation Plan</h2>
                            <span className="count-badge">{report.preparationPlan?.length || 0} days</span>
                        </div>
                        <div className="prep-timeline">
                            {report.preparationPlan?.map((day, i) => (
                                <div className="prep-day" key={i}>
                                    <div className="day-marker">
                                        <div className="day-number">D{day.day}</div>
                                        <div className="day-line" />
                                    </div>
                                    <div className="day-content">
                                        <p className="day-focus">{day.focus}</p>
                                        <ul className="day-tasks">
                                            {day.tasks.map((task, j) => (
                                                <li key={j}>{task}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                            {(!report.preparationPlan || report.preparationPlan.length === 0) && (
                                <p className="empty-section">No preparation plan available.</p>
                            )}
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <div className="interview-report-page">
            {/* ── Header ── */}
            <div className="report-top-bar">
                <Link to="/" className="back-link">← Back</Link>
                <div className="header-info">
                    <h1>{report.title}</h1>
                    <p className="report-date">{formatDate(report.createdAt)}</p>
                </div>
                <div className="score-gauge">
                    <div className={`score-circle ${getScoreClass(report.matchScore)}`}>
                        {report.matchScore}
                    </div>
                    <span className="score-label">Match</span>
                </div>
            </div>

            {/* ── Main Layout ── */}
            <div className="report-layout">
                {/* Sidebar */}
                <aside className="report-sidebar">
                    <nav className="sidebar-nav">
                        {SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                className={`sidebar-item ${activeSection === section.id ? "active" : ""}`}
                                onClick={() => setActiveSection(section.id)}
                            >
                                <span className="sidebar-icon">{section.icon}</span>
                                <span className="sidebar-label">{section.label}</span>
                            </button>
                        ))}
                    </nav>

                    <div className="sidebar-actions">
                        <button
                            className="btn-download"
                            onClick={() => getResumePdf(report._id)}
                            disabled={loading}
                        >
                            📄 Download Resume
                        </button>
                    </div>
                </aside>

                {/* Content Area */}
                <main className="report-content">
                    {renderContent()}
                </main>
            </div>
        </div>
    )
}

export default InterviewReport
