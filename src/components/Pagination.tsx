import { Fragment, h } from 'preact'
import { FC } from 'preact/compat'
import style from './style.css'
import { useState } from 'preact/hooks'

interface PaginationProps {
    count: number
    offset: number
    setOffset: Function
}

const Pagination: FC<PaginationProps> = ({ count, offset, setOffset }) => {
    const limit = 50
    const [page, setPage] = useState<number>(1)

    const lastPage = Math.floor(count / limit)

    const range = (start: number, end: number) => {
        let length = end - start + 1

        return Array.from({ length }, (_, idx) => idx + start)
    }

    const changeHandler = (
        e: h.JSX.TargetedEvent<HTMLSelectElement, Event>
    ) => {
        const target = e.target as HTMLSelectElement

        setOffset(50 * target.value)
        setPage(target.value)
    }

    return (
        <Fragment>
            {page} page out of {lastPage}
            <button
                onClick={() => {
                    setOffset((curr: number) => curr - 50 * 1)
                    setPage((page: number) => page - 1)
                }}
            >
                Prev
            </button>
            <button
                onClick={() => {
                    setOffset((curr: number) => curr + 50 * 1)
                    setPage((page: number) => page + 1)
                }}
            >
                Next
            </button>
            <select onChange={changeHandler}>
                {range(1, lastPage).map((i) => (
                    <option value={i}>{i}</option>
                ))}
            </select>
        </Fragment>
    )
}

export default Pagination
