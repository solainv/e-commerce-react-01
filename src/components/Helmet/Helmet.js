import React from 'react'

const Helmet = (props) => {
    document.title = 'Mystore - '+ props.title
    return (
        <div className='w-100'>{props.children}</div>
    )
}

export default Helmet