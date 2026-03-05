import { Link } from "react-router"
import { useInterview } from "../hooks/useInterview"
import "../style/interview.scss"

function InterviewReport() {
    const { loading, report, getResumePdf } = useInterview()

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

    return (
        <div className="interview-report-page">
            <Link to="/" className="back-link">← Back to Dashboard</Link>

            {/* ── Header with Score ── */}
            <div className="report-header">
                <div className="header-info">
                    <h1>{report.title}</h1>
                    <p className="report-date">{formatDate(report.createdAt)}</p>
                </div>
                <div className="score-gauge">
                    <div className={`score-circle ${getScoreClass(report.matchScore)}`}>
                        {report.matchScore}
                    </div>
                    <span className="score-label">Match Score</span>
                </div>
            </div>

            <div className="report-actions">
                <button
                    className="btn-primary"
                    onClick={() => getResumePdf(report._id)}
                    disabled={loading}
                >
                    📄 Download Tailored Resume
                </button>
                <Link to="/" className="btn-secondary" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
                    ← Dashboard
                </Link>
            </div>

            {/* ── Technical Questions ── */}
            {report.technicalQuestions?.length > 0 && (
                <div className="report-section">
                    <h2>
                        <span className="icon">💻</span>
                        Technical Questions
                    </h2>
                    <div className="qa-list">
                        {report.technicalQuestions.map((q, i) => (
                            <div className="qa-card" key={i}>
                                <p className="qa-question">{i + 1}. {q.question}</p>
                                <p className="qa-intention">{q.intention}</p>
                                <p className="qa-answer">{q.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Behavioral Questions ── */}
            {report.behavioralQuestions?.length > 0 && (
                <div className="report-section">
                    <h2>
                        <span className="icon">🤝</span>
                        Behavioral Questions
                    </h2>
                    <div className="qa-list">
                        {report.behavioralQuestions.map((q, i) => (
                            <div className="qa-card" key={i}>
                                <p className="qa-question">{i + 1}. {q.question}</p>
                                <p className="qa-intention">{q.intention}</p>
                                <p className="qa-answer">{q.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Skill Gaps ── */}
            {report.skillGaps?.length > 0 && (
                <div className="report-section">
                    <h2>
                        <span className="icon">⚠️</span>
                        Skill Gaps
                    </h2>
                    <div className="skill-gaps-list">
                        {report.skillGaps.map((gap, i) => (
                            <div className={`skill-chip ${gap.severity}`} key={i}>
                                <span className="severity-dot" />
                                {gap.skill}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* ── Preparation Plan ── */}
            {report.preparationPlan?.length > 0 && (
                <div className="report-section">
                    <h2>
                        <span className="icon">🗓️</span>
                        Preparation Plan
                    </h2>
                    <div className="prep-timeline">
                        {report.preparationPlan.map((day, i) => (
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
                    </div>
                </div>
            )}
        </div>
    )
}

export default InterviewReport
