import React from 'react'
import Land from '../Land'
// import Gateway from '../Gateway'
import Obstacle from '../Obstacle'
import Hero from '../Hero'

export default class State extends React.Component {
    constructor(props) {
        super(props)
        const initialMatrix = this.setInitialMatrix(props.LANDHEIGHT, props.LANDWIDTH, props.UNIT)
        this.state = {
            ...initialMatrix,
            moveHero: null
        }
    }

    setInitialMatrix = (height, width, unit) => {
        let initialMatrix = {}
        for (let r = 0; r < (height / unit); r++) {
            for (let c = 0; c < (width / unit); c++) {
                initialMatrix = { ...initialMatrix, ...JSON.parse(`{ "area_${r}_${c}" : { "status" : "F", "id" : "area_${r}_${c}" } }`) }
            }
        }
        return initialMatrix
    }

    updateMatrix = (free, blocked, id) => {
        if (free && free.length > 0)
            free.forEach(f => {
                this.setState(JSON.parse(f))
            });

        if (blocked && blocked.length > 0)
            blocked.forEach(b => {
                this.setState(JSON.parse(b))
            });
    }

    render() {
        const childCommonProps = {
            updateMatrix: (free, blocked, id) => this.updateMatrix(free, blocked, id),
            matrix: this.state,
            unit: this.props.UNIT
        }

        console.log(this.state)

        return (
            <Land width={this.props.LANDWIDTH} height={this.props.LANDHEIGHT} >
                <Hero id='hero' {...childCommonProps} startPosition={{ status: 'B', id: "area_9_7" }} move={this.state.moveHero} />
                <Obstacle id='obs1' {...childCommonProps} startPosition={{ status: 'B', id: "area_6_14" }} />
                <Obstacle id='obs2' {...childCommonProps} startPosition={{ status: 'B', id: "area_12_8" }} />
                {/* <Gateway {...childCommonProps} startPosition={{ r: 3, c: 3 }} /> */}
            </Land>
        )
    }
}