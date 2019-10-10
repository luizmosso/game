import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import * as gameActions from './actions/game';
import Stage from './components/Stage'

function Game(props) {
  const LANDWIDTH = 800
  const LANDHEIGHT = 600
  const UNIT = 40

  useEffect(() => {
    document.addEventListener('keydown', (event) => {
      const moveKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
      if (moveKeys.includes(event.key)) {
        props.setKeyDown(event.key.replace('Arrow', '').toLowerCase())
      }
    }, false)
  }, []);

  const stageCommonProps = { LANDWIDTH, LANDHEIGHT, UNIT }
  const styles = {
    game: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }

  return (
    <div className="Game" style={styles.game}>
      <Stage {...stageCommonProps} />
    </div>
  );
}

const mapStateToProps = state => ({ game: state.game });
const mapDispatchToProps = dispatch => bindActionCreators(gameActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
