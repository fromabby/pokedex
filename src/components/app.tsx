import { h } from 'preact'
import { Route, Router } from 'preact-router'

// Code-splitting is automated for `routes` directory
import Home from '../routes/home'
import Pokemon from '../routes/pokemon'

import Header from './header'

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
