import React from 'react'

function MessageBox(props) {
    return (
        <div className="errorMessage">{props.children}</div>
    )
}

export default MessageBox
