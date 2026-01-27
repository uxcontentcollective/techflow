import { useState } from 'react';

// Debug panel for testing different application states.
// In a real product, these states would be triggered by actual conditions.
// This panel lets you see what each state looks like.

function DebugPanel({ appState, onStateChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const states = [
    { key: 'populated', label: 'Populated', description: 'Normal state with data' },
    { key: 'loading', label: 'Loading', description: 'Loading spinner state' },
    { key: 'error', label: 'Error', description: 'Error messages displayed' },
    { key: 'empty', label: 'Empty', description: 'No data / empty state' },
  ];

  return (
    <div className={`debug-panel ${isOpen ? 'open' : ''}`}>
      <button
        className="debug-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Toggle debug panel"
      >
        🔧
      </button>

      {isOpen && (
        <div className="debug-content">
          <h4>Debug Panel</h4>
          <p className="debug-description">
            Switch application states to test different UI conditions.
          </p>
          <div className="debug-states">
            {states.map((state) => (
              <button
                key={state.key}
                className={`debug-state-btn ${appState === state.key ? 'active' : ''}`}
                onClick={() => onStateChange(state.key)}
              >
                <span className="debug-state-label">{state.label}</span>
                <span className="debug-state-desc">{state.description}</span>
              </button>
            ))}
          </div>
          <div className="debug-info">
            <p>Current state: <strong>{appState}</strong></p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DebugPanel;
