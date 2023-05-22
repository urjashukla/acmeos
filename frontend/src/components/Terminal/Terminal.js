import React from 'react';
import Terminal from 'react-bash';
import './TerminalUI.css';

const TerminalUI = () => {
  const structure = {
    system: {
      Desktop: {},
      Documents: {
        basics: {
          content: 'Learning Linux commands',
        },
      },
      Downloads: {},
      Music: {},
      Pictures: {},
      Public: {},
      Templates: {},
      Videos: {},
    },
    '.hiddenDir': {},
    '.hiddenFile': {},
  };
  const history = [
    {
      value:
        "Try out your favourite linux commands. Type 'help' to look at all the commands available.",
    },
  ];
  return (
    <div id="termMain">
      <div id="terminal">
        <Terminal
          prefix="user@system"
          structure={structure}
          history={history}
        />
      </div>
    </div>
  );
};

export default TerminalUI;
