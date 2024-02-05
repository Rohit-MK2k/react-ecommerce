import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ContextProvider } from './Context'; 
import Navbar from './components/shared/Navbar';
import Homepage from './components/pages/Homepage';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Authbox from './components/pages/Authbox';

function App() {
  return (
    <ContextProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Homepage />}>
            <Route index element={<Authbox/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Route>
        </Routes>
      </Router>
    </ContextProvider>
  );
}

export default App;
