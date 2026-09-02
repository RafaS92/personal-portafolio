import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";

const TOPICS = [
  { id: "about", icon: "◎" },
  { id: "projects", icon: "◇" },
  { id: "skills", icon: "⌘" },
  { id: "experience", icon: "↗" },
  { id: "services", icon: "+" },
];

export default function ExploreRafa({
  isLoading,
  onExpandedChange,
  onSelect,
}) {
  const [isExpanded, setIsExpanded] = useState(true);
  const intl = useIntl();

  useEffect(() => {
    onExpandedChange?.(isExpanded);
  }, [isExpanded, onExpandedChange]);

  const handleSelect = (topic) => {
    const wasSent = onSelect(
      intl.formatMessage({ id: `chatExplore${topic.id}Prompt` })
    );
    if (wasSent) setIsExpanded(false);
  };

  return (
    <section className="chatbot-explore" aria-label={intl.formatMessage({ id: "chatExploreTitle" })}>
      <button
        type="button"
        className="chatbot-explore-toggle"
        aria-expanded={isExpanded}
        onClick={() => setIsExpanded((current) => !current)}
      >
        <span aria-hidden="true">✦</span>
        <span>{intl.formatMessage({ id: "chatExploreTitle" })}</span>
        <span className="chatbot-explore-toggle-icon" aria-hidden="true">
          {isExpanded ? "−" : "+"}
        </span>
      </button>

      {isExpanded && (
        <div className="chatbot-explore-content">
          <p>{intl.formatMessage({ id: "chatExploreIntro" })}</p>
          <div className="chatbot-explore-options">
            {TOPICS.map((topic) => (
              <button
                type="button"
                key={topic.id}
                disabled={isLoading}
                onClick={() => handleSelect(topic)}
              >
                <span className="chatbot-explore-option-icon" aria-hidden="true">
                  {topic.icon}
                </span>
                <span>
                  <strong>
                    {intl.formatMessage({
                      id: `chatExplore${topic.id}Label`,
                    })}
                  </strong>
                  <small>
                    {intl.formatMessage({
                      id: `chatExplore${topic.id}Hint`,
                    })}
                  </small>
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export { TOPICS };
