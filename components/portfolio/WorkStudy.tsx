/** Original interface concepts drawn with DOM and SVG, not client project screenshots. */
export function WorkStudy({ variant }: { variant: number }) {
  return (
    <span
      className={`interface-composition work-study study-${variant}`}
      aria-hidden="true"
    >
      <span className="study-chrome">
        <span className="study-dots">
          <i />
          <i />
          <i />
        </span>
        <span>afnan / original interface study</span>
        <span>↗</span>
      </span>
      {variant === 0 ? (
        <ProductStudy />
      ) : variant === 1 ? (
        <AIStudy />
      ) : (
        <WebsiteStudy />
      )}
    </span>
  );
}

function ProductStudy() {
  return (
    <span className="study-product">
      <span className="study-sidebar">
        <b>
          Form<span>®</span>
        </b>
        <small>PRODUCT WORKSPACE</small>
        {["Overview", "Website", "Library", "Releases"].map((x, i) => (
          <span key={x} className={i === 0 ? "selected" : ""}>
            <i>{["◈", "◉", "⊞", "↗"][i]}</i>
            {x}
          </span>
        ))}
        <span className="study-team">
          <i>A</i>
          <i>D</i>
          <i>+</i>
          <small>Made together.</small>
        </span>
      </span>
      <span className="study-product-main">
        <span className="study-head">
          <span>
            <small>DESIGN MEETS DEVELOPMENT</small>
            <b>Your next release.</b>
            <span>A clear view of everything in motion.</span>
          </span>
          <em>+ New project</em>
        </span>
        <span className="study-stat-row">
          {[
            ["Reusable blocks", "24"],
            ["Page templates", "08"],
            ["Interaction states", "12"],
          ].map(([label, value], i) => (
            <span key={label}>
              <small>{label}</small>
              <b>{value}</b>
              <svg viewBox="0 0 70 28" fill="none">
                <path
                  d={
                    i === 1
                      ? "M2 22 15 17 26 20 40 10 52 13 68 3"
                      : "M2 24 12 21 26 12 39 17 51 8 68 4"
                  }
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <small>Inside this concept</small>
            </span>
          ))}
        </span>
        <span className="study-product-grid">
          <span className="study-release">
            <span className="study-row">
              <b>Release overview</b>
              <small>This week ⌄</small>
            </span>
            <svg viewBox="0 0 280 90" fill="none">
              <path
                d="M0 20H280M0 45H280M0 70H280M45 0V90M90 0V90M135 0V90M180 0V90M225 0V90"
                stroke="currentColor"
                opacity=".1"
              />
              <path
                d="M0 74C25 74 22 38 52 45S90 63 117 32 146 44 171 24 218 38 244 13 265 19 280 7V90H0Z"
                fill="currentColor"
                opacity=".1"
              />
              <path
                d="M0 74C25 74 22 38 52 45S90 63 117 32 146 44 171 24 218 38 244 13 265 19 280 7"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="171" cy="24" r="4" fill="currentColor" />
            </svg>
            <span className="study-row">
              <small>Mon</small>
              <small>Tue</small>
              <small>Wed</small>
              <small>Thu</small>
              <small>Fri</small>
            </span>
          </span>
          <span className="study-site-preview">
            <span className="study-mini-nav">
              <b>form.</b>
              <small>Explore ↗</small>
            </span>
            <b>
              One idea.
              <br />
              Every possibility.
            </b>
            <span className="study-preview-orb" />
            <small>Explore the collection →</small>
          </span>
        </span>
        <span className="study-table">
          <span className="study-row">
            <b>In the making</b>
            <small>View all ↗</small>
          </span>
          {[
            ["Landing page", "Design", "In review"],
            ["Component library", "Build", "Ready"],
            ["Onboarding flow", "Motion", "In progress"],
          ].map(([a, b, c]) => (
            <span key={a}>
              <i />
              <b>{a}</b>
              <small>{b}</small>
              <em>{c}</em>
            </span>
          ))}
        </span>
      </span>
    </span>
  );
}
function AIStudy() {
  return (
    <span className="study-ai">
      <span className="study-ai-side">
        <b>
          Still<span>✳</span>
        </b>
        <em>+ New conversation</em>
        <small>YOUR WORKSPACE</small>
        {[
          "A clearer product story",
          "Ideas for an interface",
          "A thoughtful first draft",
        ].map((x) => (
          <span key={x}>◌ {x}</span>
        ))}
        <span className="study-ai-files">
          <small>CONNECTED CONTEXT</small>
          <span>▤ Design brief.pdf</span>
          <span>▤ Component notes</span>
          <span>▤ Tone of voice</span>
        </span>
        <span className="study-row">
          <i className="study-avatar">AM</i>
          <small>Afnan’s workspace</small>
        </span>
      </span>
      <span className="study-ai-main">
        <span className="study-row">
          <small>CREATIVE ASSISTANT / ORIGINAL CONCEPT</small>
          <em>◉ Context connected</em>
        </span>
        <span className="study-ai-title">
          Make room for
          <br />
          <i>a better idea.</i>
        </span>
        <span className="study-chat-user">
          <small>YOU</small>
          <span>How could this product feel simpler?</span>
        </span>
        <span className="study-chat-answer">
          <span className="study-row">
            <b>✳ Still</b>
            <small>Thoughtfully considered</small>
          </span>
          <span>
            Start with what people need. Give each action a clear purpose, then
            make the next step feel natural.
          </span>
          <span className="study-answer-options">
            <span>
              <b>01</b>Clear hierarchy
            </span>
            <span>
              <b>02</b>Gentle feedback
            </span>
            <span>
              <b>03</b>Fewer decisions
            </span>
          </span>
          <small>▤ Design brief · ▤ Component notes</small>
        </span>
        <span className="study-prompt">
          Explore your next idea…<i>↑</i>
        </span>
        <span className="study-row">
          <small>Attach context ＋</small>
          <small>A little intelligence. A lot of intention.</small>
        </span>
      </span>
    </span>
  );
}
function WebsiteStudy() {
  return (
    <span className="study-website">
      <span className="study-site-nav">
        <b>FORM & FEEL</b>
        <span>Work　Studio　Contact ↗</span>
        <i>●</i>
      </span>
      <span className="study-site-hero">
        <span>
          <small>INDEPENDENT DIGITAL STUDIO</small>
          <b>
            Good ideas.
            <br />
            <i>Beautifully felt.</i>
          </b>
          <span>
            Design that moves you.
            <br />
            Development that makes it real.
          </span>
          <em>Explore the work ↗</em>
        </span>
        <svg viewBox="0 0 180 180" fill="none">
          <circle cx="90" cy="90" r="70" fill="currentColor" opacity=".08" />
          {Array.from({ length: 8 }, (_, i) => (
            <ellipse
              key={i}
              cx="90"
              cy="90"
              rx={25 + i * 5}
              ry="70"
              transform={`rotate(${i * 24} 90 90)`}
              stroke="currentColor"
              strokeWidth=".7"
              opacity={0.3 + i * 0.06}
            />
          ))}
          <circle cx="90" cy="90" r="6" fill="currentColor" />
        </svg>
      </span>
      <span className="study-row study-site-label">
        <small>SELECTED EXPLORATIONS</small>
        <small>Thoughtful by design.</small>
      </span>
      <span className="study-site-projects">
        {["A sense of clarity", "Room to imagine", "Details that matter"].map(
          (x, i) => (
            <span key={x}>
              <span className={`study-project-art art-${i}`}>
                <i />
                <i />
                <i />
              </span>
              <span>
                <b>{x}</b>
                <small>0{i + 1} ↗</small>
              </span>
            </span>
          ),
        )}
      </span>
      <span className="study-site-footer">
        <small>FORM / FEEL / FUNCTION</small>
        <span>Let’s make something worth feeling. ↗</span>
      </span>
    </span>
  );
}
