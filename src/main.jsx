import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import About from './pages/about.jsx'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Privacy from './pages/privacy.jsx'
import Contact from './pages/contact.jsx'
import Features from './pages/features.jsx'
import Terms from './pages/terms.jsx'
import PageNotFound from './pages/pagenotfound.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </Router>
  </StrictMode>,
)

