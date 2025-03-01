import { Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './Home'
import Achievements from './Achievements'
import Kudos from './Kudos'
import Badges from './Badges'
import Preview from './Preview'
import Mint from './Mint'

function App() {
    return (
        <div className='container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/badges" element={<Badges />} />
                <Route path="/kudos" element={<Kudos />} />
                <Route path="/preview" element={<Preview />} />
                <Route path="/mint" element={<Mint />} />
            </Routes>
        </div>
    )
}

export default App
