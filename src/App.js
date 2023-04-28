import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Single from './pages/Single/Single';
import CreateJob from './pages/CreateJob/CreateJob';
import UpdateJob from './pages/UpdateJob/UpdateJob';
import './reset.css';
import './App.css';

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/jobs/:id" element={<Single />} />
                <Route exact path="/create" element={<CreateJob />} />
                <Route exact path="/update/:id" element={<UpdateJob />} />
            </Routes>
        </Router>
    );
}

export default App;