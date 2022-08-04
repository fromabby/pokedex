import { h } from 'preact'
import { FC } from 'preact/compat'
import style from './style.css'
import { useState } from 'preact/hooks'
import Search from '../search'

interface PaginationProps {
    count: number
    setOffset: Function
    setInput: Function
}

const Pagination: FC<PaginationProps> = ({ count, setOffset, setInput }) => {
    const limit = 50
    const [page, setPage] = useState<number>(1)

    let length = Math.floor(count / limit)

    const pages = Array.from({ length }, (_, idx) => idx + 1)

    const changeHandler = (
        e: h.JSX.TargetedEvent<HTMLSelectElement, Event>
    ) => {
        const target = e.target as HTMLSelectElement

        setOffset(50 * target.value)
        setPage(Number(target.value))
    }

    const skipTo = (page: number) => {
        setOffset(50 * page)
        setPage(Number(page))
    }

    return (
        <div class={style.pagination_container}>
            <div class={style.buttons}>
                <button
                    onClick={() => {
                        if (page === 1) return

                        setOffset((curr: number) => curr - 50 * 1)
                        setPage((page: number) => page - 1)
                    }}
                >
                    &#10094; Prev
                </button>
                <div class={style.page_numbers}>
                    <ul>
                        {pages.map((x, idx) => {
                            if (idx + 4 < page) return
                            if (idx > page + 2) return

                            return (
                                <li
                                    style={
                                        x === page
                                            ? {
                                                  fontWeight: '800',
                                              }
                                            : {}
                                    }
                                    onClick={() => {
                                        skipTo(x)
                                    }}
                                >
                                    {x}
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <button
                    onClick={() => {
                        if (page === length) return

                        setOffset((curr: number) => curr + 50 * 1)
                        setPage((page: number) => page + 1)
                    }}
                >
                    Next &#10095;
                </button>
            </div>
            <div class={style.dropdown}>
                <span>Page: </span>
                <select onChange={changeHandler}>
                    {pages.map((i) => (
                        <option value={i} selected={i === page}>
                            {i}
                        </option>
                    ))}
                </select>
            </div>
            <div class={style.search_bar}>
                <Search setInput={setInput} />
            </div>
        </div>
    )
}

export default Pagination
