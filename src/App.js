import Signin from './components/authentication/signin.jsx';
import ReactNotifications from 'react-notifications-component';
import Signup from './components/authentication/signup.jsx';
import Home from './components/homepage/home.jsx';
import About from './components/homepage/about.jsx';
import Mision from './components/homepage/mision_vision.jsx';
import Accounts from './components/accounts/accounts_info.jsx';
import Loans from './components/accounts/loans.jsx';
import Card_information from './components/accounts/card_information.jsx';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Footer from './components/footer.jsx';

function App() {
  return (
    <div>
      <ReactNotifications />
      <Router>
        <Routes>
          <Route path="/signin" element={<Signin />}/> 
          <Route path="/signup" element={<Signup />}/>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />}/>
          <Route path="/mision-vision" element={<Mision />}/>
          <Route path="/user/home" element={<Accounts />}/>
          <Route path="/user/loans" element={<Loans />} / >
          <Route path="/user/card" element={<Card_information />}/>
        </Routes> 
     </Router>
      <Footer />
   </div>
  );
}

export default App;
