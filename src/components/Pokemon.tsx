import { h } from 'preact'
import { Link } from 'preact-router/match'
import { FC } from 'preact/compat'
import style from './style.css'

interface PokemonProps {
    id: string
    pokemon: {
        name: string
        url: string
    }
}

const Pokemon: FC<PokemonProps> = ({ id, pokemon }) => {
    return (
        <div>
            <Link href={`/pokemon/${id}`} key={id}>
                {pokemon.name}
            </Link>
        </div>
    )
}

export default Pokemon
