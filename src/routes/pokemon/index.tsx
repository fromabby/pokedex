import { h } from 'preact'
import style from './style.css'

import { useState, useEffect } from 'preact/hooks'
import { FC } from 'preact/compat'

interface Types {
    slot: number
    type: {
        name: string
        url: string
    }
}

interface Pokemon {
    pokeId: number
    name: string
    base_experience: number
    height: number
    order: number
    weight: number
    types: Types[]
}

interface PokemonProps {
    id: number
}

const Pokemon: FC<PokemonProps> = ({ id }) => {
    const [pokemon, setPokemon] = useState<Pokemon>({
        pokeId: 0,
        name: '',
        base_experience: 0,
        height: 0,
        order: 0,
        weight: 0,
        types: [],
    })

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const getData = async (id: number) => {
            try {
                const data = await fetch(
                    `https://pokeapi.co/api/v2/pokemon/${id}`
                ).then((res) => res.json())
                const {
                    id: pokeId,
                    name,
                    base_experience,
                    height,
                    order,
                    weight,
                    types,
                } = data

                setPokemon({
                    pokeId,
                    name,
                    base_experience,
                    height,
                    order,
                    weight,
                    types,
                })

                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        getData(id)
    }, [id])

    const url = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`

    return loading ? (
        <h1 style={{ textAlign: 'center' }}>Loading...</h1>
    ) : (
        pokemon && (
            <div class={style.card}>
                <div class={style.image}>
                    <img src={url} alt={pokemon.name} />
                </div>

                <h3>
                    #{id} {pokemon.name}
                </h3>
                <div class={style.types}>
                    <h4>Types:</h4>
                    {pokemon.types &&
                        pokemon.types.map((x) => <p>{x.type.name}</p>)}
                </div>
            </div>
        )
    )
}

export default Pokemon
