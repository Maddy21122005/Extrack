import React, { useEffect, useState } from 'react';
import '../styles/pageTransition.css';

const PageTransition = ({ children }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`page-transition ${show ? 'fade-in' : ''}`}>
      {children}
    </div>
  );
};

export default PageTransition;
