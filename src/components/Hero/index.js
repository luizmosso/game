import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as gameActions from '../../actions/game';
import Obstacle from '../Obstacle'

class Hero extends Obstacle {
    constructor(props) {
        super(props)
        this.state = {
            position: props.startPosition,
            top: this.styles.top,
            left: this.styles.left,            
        }
    }

    move = (side) => {
        if (side === '') return

        const positionArr = this.state.position.id.split('_')
        positionArr.shift()
        let [row, col] = positionArr
        const prevPosition = `{ "area_${row}_${col}" : { "status" : "F", "id" : "area_${row}_${col}"} }`

        let nextTop = JSON.parse(JSON.stringify(this.state.top))
        let nextLeft = JSON.parse(JSON.stringify(this.state.left))
        let changedTop = false
        let changedLeft = false

        switch (side) {
            case 'up':
                row = parseInt(row) - 1;
                nextTop = this.state.top - this.props.unit
                changedTop = true
                break;
            case 'left':
                col = parseInt(col) - 1
                nextLeft = this.state.left - this.props.unit
                changedLeft = true
                break;
            case 'right':
                col = parseInt(col) + 1
                nextLeft = this.state.left + this.props.unit
                changedLeft = true
                break;
            case 'down':
                row = parseInt(row) + 1;
                nextTop = this.state.top + this.props.unit
                changedTop = true
                break;
            default:
                break;
        }

        const positionData = `{ "status" : "B", "id" : "area_${row}_${col}"}`
        const nextPosition = `{ "area_${row}_${col}" : ${positionData} }`

        if (this.props.matrix[`area_${row}_${col}`].status === 'F') {
            const state = this.state
            if (changedTop) state.top = nextTop
            if (changedLeft) state.left = nextLeft
            const finalPosition = JSON.parse(positionData)
            this.setState({ position: finalPosition, top: state.top, left: state.left })
            this.props.updateMatrix([prevPosition], [nextPosition], 'heroMoving')
        }
    }

    componentDidUpdate(newProps, newState) {
        if (this.state.position === newState.position)
            if (this.props.game.keyDown && this.props.game.keyDown !== '') {
                this.move(this.props.game.keyDown)
            }
    }

    render() {
        const styles = { ...this.styles, top: this.state.top, left: this.state.left, background : 'blue' }
        return <div style={styles}>HERO</div>
    }
}

const mapStateToProps = state => ({ game: state.game });
const mapDispatchToProps = dispatch => bindActionCreators(gameActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Hero);