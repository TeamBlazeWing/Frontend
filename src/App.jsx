import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import FogetPassword from './components/FogetPassword/FogetPassword'
import Event from './components/Event/Event' 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<FogetPassword />} />
        <Route path="/events" element={<Event />} />
      </Routes>
    </Router>
  )
}

export default App