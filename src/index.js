import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dnd from './Dnd';
import Tree from './Tree';
import reportWebVitals from './reportWebVitals';

const Router = () => {
  const [app, setApp] = useState(null)
  const listener = () => {
    switch(window.location.pathname) {
      case '/app1': return setApp(<Dnd />)
      default: setApp(<Tree />)
    }
  }

  useEffect(() => {
    listener()
    window.addEventListener('popstate', listener)
    return () => window.removeEventListener('popstate', listener)
  }, [])

  return <>{app}</>
}

ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
