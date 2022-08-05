import { h } from 'preact'
import style from './style.css'

import { useState, useEffect } from 'preact/hooks'
import { FC } from 'preact/compat'
import Pokemon from '../../components/pokemon'
import Pagination from '../../components/pagination'

interface Pokemons {
    name: string
    url: string
}

interface Pokemon {
    name: string
    id: number
    url: string
}

const Home: FC = () => {
    const [pokemons, setPokemons] = useState<Pokemons[]>([])
    const [count, setCount] = useState<number>(1)
    const [offset, setOffset] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const limit = 50

    const [input, setInput] = useState<string>('')

    const [pokemon, setPokemon] = useState<Pokemon>({
        name: '',
        id: 0,
        url: '',
    })

    useEffect(() => {
        const getData = async (
            input: string,
            offset: number,
            limit: number
        ) => {
            try {
                if (input) {
                    const { name, id } = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/${input}`
                    ).then((res) => res.json())

                    setPokemon({
                        name,
                        id,
                        url: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`,
                    })
                } else {
                    const { count, results } = await fetch(
                        `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
                    ).then((res) => res.json())

                    setPokemons(results)
                    setCount(count)
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                if (input) {
                    setPokemon({
                        name: '',
                        id: 0,
                        url: '',
                    })
                } else {
                    setPokemons([])
                }
            }
        }

        getData(input, offset, limit)
    }, [offset, input])

    return (
        <div class={style.home}>
            <Pagination
                count={count}
                setOffset={setOffset}
                setInput={setInput}
            />
            <div class={style.gallery}>
                {loading ? (
                    <h3>Loading...</h3>
                ) : input ? (
                    pokemon.id !== 0 ? (
                        <Pokemon id={pokemon.id.toString()} pokemon={pokemon} />
                    ) : (
                        <h3>'{input}' does not exist in Pokédex.</h3>
                    )
                ) : (
                    pokemons.map((pokemon) => {
                        const id = pokemon.url.slice(34)

                        return <Pokemon id={id} pokemon={pokemon} />
                    })
                )}
            </div>
        </div>
    )
}

export default Home
