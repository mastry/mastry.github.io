import React, { useEffect } from 'react'
import { parseISO } from 'date-fns'

export interface DateProps {
    dateString: string
    className: string
}

const Date: React.FC<DateProps> = (props) => {

    const date = parseISO(props.dateString)
    return (
        <time className={props.className} dateTime={props.dateString}>
            {date.toUTCString()}
        </time>
    )
}

export default Date
