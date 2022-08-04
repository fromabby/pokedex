import { h } from 'preact'
import { FC } from 'preact/compat'
import { route } from 'preact-router'
import style from './style.css'

const Header: FC = () => (
    <div class={style.nav}>
        <h1>Pokédex</h1>
        <ul>
            <li
                onClick={() => {
                    route('/')
                }}
            >
                Home
            </li>
        </ul>
    </div>
)

export default Header
