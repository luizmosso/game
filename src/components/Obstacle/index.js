import React from 'react'

export default class Obstacle extends React.Component {

    constructor(props) {
        super(props)
        this.styles = {
            height: this.props.unit,
            width: this.props.unit,
            background: 'brown',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '0.7em',
            position: 'absolute',
            top: this.setInitialTop(props.startPosition, props.unit),
            left: this.setInitialLeft(props.startPosition, props.unit),
        }
    }

    setInitialTop = (startPosition, unit) => {
        const row = startPosition.id.split('_')[1]
        return parseInt(row) * unit
    }

    setInitialLeft = (startPosition, unit) => {
        const col = startPosition.id.split('_')[2]
        return parseInt(col) * unit
    }

    componentDidMount() {
        const { status, id } = this.props.startPosition
        const position = `{ "${id}" : { "status" : "${status}", "id" : "${id}"} }`
        this.props.updateMatrix([], [position], id)
    }

    render() {
        return <div style={this.styles}>OBS</div>
    }
}