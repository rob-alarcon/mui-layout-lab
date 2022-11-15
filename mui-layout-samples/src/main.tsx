import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import App from './App'
import Create from './Create'
import Layout from './Layout'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/create' element={<Create />} />
        </Routes>
        </Layout>
    </Router>
  </React.StrictMode>
);
