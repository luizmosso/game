import React from 'react'

function Land(props) {
    const landStyle = {
        height: props.height,
        width: props.width,
        border: '2px solid black',
        position: 'relative'
    }

    return (
        <div style={landStyle}>
            {props.children}
        </div>
    )
}


export default Land