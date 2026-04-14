import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n.ts'

/**
 * Application Entry Point.
 * Mounts the React application to the DOM root element.
 *
 * @author Harry Vasanth (harryvasanth.com)
 * @copyright (c) 2026
 */
const rootElement = document.getElementById('root')

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}
