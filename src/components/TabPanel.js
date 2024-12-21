// components/TabPanel.js
import React from 'react';

const TabPanel = ({ children, value, index }) => {
  return value === index ? <div>{children}</div> : null;
};

export default TabPanel;
