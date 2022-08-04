import { h } from 'preact'
import { Route, Router } from 'preact-router'

import Header from './header'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Pokemon from '../routes/pokemon'

const App = () => (
    <div id='app'>
        <Header />
        <Router>
            <Route path='/' component={Home} />
            <Route path='/pokemon/:id' component={Pokemon} />
        </Router>
    </div>
)

export default App
