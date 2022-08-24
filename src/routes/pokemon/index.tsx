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
          <div class={style.flip}>
            <div class={style.inner}>
              <div class={style.front}>
                <h3>{id}</h3>
                <div class={style.image}>
                    <img src={url} alt={pokemon.name} />
                </div>
                <p>{pokemon.name}</p>
              </div>
              <div class={style.back}>
                <div class={style.types}>
                      <div class={style.title}>
                        <h4>{pokemon.name}</h4>
                        <h4>{id}</h4>
                      </div>
                      {pokemon.types &&
                          pokemon.types.map((x) => <p key={x.type.name}>{x.type.name} TYPE</p>)}
                  </div>
              </div>
            </div>
          </div>
        )
    )
}

export default Pokemon
