import { h } from 'preact'
import { FC } from 'preact/compat'
import style from './style.css'
import { route } from 'preact-router'

interface Pokemon {
  name: string
  url: string
}

interface SidebarProps {
  pokemons: Pokemon[]
}

const Sidebar: FC<SidebarProps> = ({ pokemons }) => {
  const redirectTo = (url: string) => {
    route(url)
  }

  return (
    <div class={style.sidebar}>
      <div class={style.list}>
          {pokemons.map(({name, url}) => {
            const id = url.slice(34)
            const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id.substring(0, id.length - 1)}.png`

            return (
              <div key={name} class={style.name_card} onClick={() => redirectTo(`/pokemon/${id}`)}>
              <div class={style.icon}>
                <img src={image} alt={``} />
              </div>
              {name}
            </div>
            )
            })}
      </div>
    </div>
  )
}

export default Sidebar