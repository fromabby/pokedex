import { h } from 'preact'
import style from './style.css'

import { useState, useEffect } from 'preact/hooks'
import { Link } from 'preact-router'
import { FC } from 'preact/compat'
import Pokemon from '../../components/Pokemon'
import Pagination from 'src/components/Pagination'

interface Pokemons {
    name: string
    url: string
}

const Home: FC = () => {
    const [pokemons, setPokemons] = useState<Pokemons[]>([])
    const [count, setCount] = useState<number>(1)
    const [offset, setOffset] = useState<number>(0)

    const limit = 50

    useEffect(() => {
        const getData = async (offset: number, limit: number) => {
            const { count, results } = await fetch(
                `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
            ).then((res) => res.json())

            setPokemons(results)
            setCount(count)
        }

        getData(offset, limit)
    }, [offset])


    return (
        <div class={style.home}>
            <h1>Home</h1>
            <Pagination count={count} offset={offset} setOffset={setOffset}/>
            {pokemons.map(pokemon => {
                const id = pokemon.url.slice(34)

                return <Pokemon id={id} pokemon={pokemon}>
            })}
        </div>
    )
}

export default Home
