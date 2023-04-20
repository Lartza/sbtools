import React from 'react';

const actionTypeElements = {
  skip: <span title="Skip">⏭️</span>,
  mute: <span title="Mute">🔇</span>,
  full: <span title="Full Video Label">♾️</span>,
  poi: <span title="Highlight">✨️</span>,
  chapter: <span title="Chapter">🏷️</span>,
};

const clipButtonStyle = {
  background: 'none',
  border: 'none',
};

function formatDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = (seconds % 1).toFixed(3).slice(2);
  return `${[hours, minutes, secs]
    .map((time) => time.toString().padStart(2, '0'))
    .join(':')}.${ms}`;
}

export { actionTypeElements, clipButtonStyle, formatDuration };
