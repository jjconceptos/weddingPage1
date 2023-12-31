import React from 'react';

const CenteredContentWrapper = ({ children }) => (
  <div className="centered-content">
    {children}
    <style jsx>{`
      .centered-content {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-left: 500px; /* Adjust the margin based on sidebar width */
      }
    `}</style>
  </div>
);

export default CenteredContentWrapper;