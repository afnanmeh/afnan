/** Original, code-native interface illustration, not a fabricated client case study. */
export function DetailedInterface() {
  return (
    <div className="detailed-interface" aria-hidden="true">
      <div className="detail-toolbar">
        <span className="detail-brand">
          am<span>®</span>
        </span>
        <span>
          Workspace <i>/</i> Overview
        </span>
        <span className="detail-search">
          ⌕ Search your library <kbd>⌘ K</kbd>
        </span>
        <span className="detail-avatar">AM</span>
      </div>
      <div className="detail-shell">
        <aside className="detail-sidebar">
          <span className="detail-label">YOUR WORKSPACE</span>
          {["Overview", "Components", "Interactions", "Design tokens"].map(
            (label, i) => (
              <span className={i === 0 ? "is-active" : ""} key={label}>
                <svg viewBox="0 0 16 16" fill="none">
                  <rect
                    x="3"
                    y="3"
                    width="10"
                    height="10"
                    rx={i % 2 ? 5 : 2}
                    stroke="currentColor"
                  />
                  <path d="M3 8H13M8 3V13" stroke="currentColor" opacity=".5" />
                </svg>
                {label}
              </span>
            ),
          )}
          <div className="detail-team">
            <span className="detail-label">MADE TOGETHER</span>
            <div>
              <i>A</i>
              <i>D</i>
              <i>+</i>
            </div>
            <small>Design meets development.</small>
          </div>
        </aside>
        <div className="detail-main">
          <div className="detail-heading">
            <div>
              <span className="detail-label">ORIGINAL INTERFACE STUDY</span>
              <h3>A considered workspace.</h3>
              <p>One system. Every little detail.</p>
            </div>
            <span className="detail-action">+ New component</span>
          </div>
          <div className="detail-metrics">
            {[
              ["Building blocks", "24", "M0 20L10 15L20 18L30 8L40 11L50 3"],
              ["Variants", "08", "M0 20L10 18L20 8L30 12L40 6L50 3"],
              ["Interactions", "12", "M0 18L10 18L20 13L30 7L40 12L50 3"],
            ].map(([label, value, path]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value}</b>
                <svg viewBox="0 0 50 24" fill="none">
                  <path d={path} stroke="currentColor" strokeWidth="1.5" />
                </svg>
                <small>Inside the system</small>
              </div>
            ))}
          </div>
          <div className="detail-grid">
            <div className="detail-chart-panel">
              <div className="detail-panel-title">
                <b>Interaction map</b>
                <span>
                  Week <i>⌄</i>
                </span>
              </div>
              <svg viewBox="0 0 270 92" fill="none" className="detail-chart">
                <path
                  d="M0 18H270M0 43H270M0 68H270M45 0V88M90 0V88M135 0V88M180 0V88M225 0V88"
                  stroke="currentColor"
                  opacity=".12"
                />
                <path
                  d="M0 70C15 66 22 48 40 50S60 64 80 40S112 35 130 43S155 18 180 28S200 14 225 17S253 5 270 9L270 88H0Z"
                  fill="currentColor"
                  opacity=".08"
                />
                <path
                  d="M0 70C15 66 22 48 40 50S60 64 80 40S112 35 130 43S155 18 180 28S200 14 225 17S253 5 270 9"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M0 75C30 80 55 68 80 72S120 47 150 54S210 41 235 38S255 27 270 32"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                  opacity=".45"
                />
                <circle cx="180" cy="28" r="3" fill="currentColor" />
                <circle
                  cx="180"
                  cy="28"
                  r="7"
                  stroke="currentColor"
                  opacity=".2"
                />
              </svg>
              <div className="detail-chart-axis">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
              </div>
            </div>
            <div className="detail-activity">
              <b>In the making</b>
              {[
                ["Navigation", "Ready"],
                ["Button states", "Review"],
                ["Motion study", "Draft"],
              ].map(([label, status]) => (
                <span key={label}>
                  <i />
                  <span>
                    {label}
                    <small>{status}</small>
                  </span>
                  <em>↗</em>
                </span>
              ))}
            </div>
          </div>
          <div className="detail-bottom">
            <div>
              <span className="detail-label">COLOR & MATERIAL</span>
              <div className="detail-swatches">
                <i />
                <i />
                <i />
                <i />
                <span>Thoughtful by design.</span>
              </div>
            </div>
            <div>
              <span className="detail-label">SYSTEM STATUS</span>
              <span className="detail-status">
                <i /> All details connected <span>↗</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
