
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Login from './components/login/Login.jsx'
import { PrimeReactProvider } from 'primereact/api'
import 'primereact/resources/themes/bootstrap4-light-blue/theme.css'
import Admin from './components/users/admin/Admin.jsx'


createRoot(document.getElementById('root')).render(
    <PrimeReactProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/login' element={<Login />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </PrimeReactProvider>
)
