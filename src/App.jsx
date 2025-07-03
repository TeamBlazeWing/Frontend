import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import FogetPassword from './components/FogetPassword/FogetPassword'
import Event from './components/Event/Event' 
import About from './components/About/About'
import Contact from './components/Contact/Contact'
import BuyTicket from './components/BuyTicket/BuyTicket'
import Messages from './components/Messages/Messages'
import Eventsss from './components/Event/Eventsss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/forgetpassword" element={<FogetPassword />} />
        <Route path="/events" element={<Event />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/buyticket" element={<BuyTicket />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/eventsss" element={<Eventsss />} />
      </Routes>
    </Router>
  )
}

export default App