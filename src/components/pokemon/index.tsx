import { h } from 'preact'
import { route } from 'preact-router'
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
    const pokeId: string | number = !Number(id)
        ? id.substring(0, id.length - 1)
        : id
    const url: string = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokeId}.png`

    const redirectTo = (url: string) => {
        route(url)
    }

    return (
        <div
            class={style.card}
            onClick={() => {
                redirectTo(`/pokemon/${id}`)
            }}
        >
            <div class={style.image}>
                <img src={url} alt={pokemon.name} />
            </div>

            <h3>{pokemon.name}</h3>
        </div>
    )
}

export default Pokemon
