import './App.css';
import {Route, Routes} from 'react-router-dom'
import Landing from './components/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import AdminHome from './components/AdminHome';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Landing/>} />
        <Route path='/admin-home' element={<AdminHome/>} />
      </Routes>
    </div>
  );
}

export default App;
