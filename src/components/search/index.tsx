import { h } from 'preact'
import { FC } from 'preact/compat'
import { useState } from 'preact/hooks'

interface SearchProps {
    setInput: Function
}

const Search: FC<SearchProps> = ({ setInput }) => {
    const [text, setText] = useState<string>('')

    const changeHandler = (e: h.JSX.TargetedEvent<HTMLInputElement, Event>) => {
        const target = e.target as HTMLInputElement
        setText(target.value)
    }

    return (
        <div>
            <input
                type='text'
                placeholder='search name'
                value={text}
                onChange={changeHandler}
            />
            <button
                type='submit'
                onClick={() => {
                    setInput(text)
                }}
            >
                Submit
            </button>
        </div>
    )
}

export default Search
