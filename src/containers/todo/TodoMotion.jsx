import React, { Component } from 'react'
import { TransitionMotion, spring, presets } from 'react-motion'
import HeightReporter from 'react-height'

// function willEnter() {
//   return {
//     height: 0,
//     opacity: 1,
//     x: 100
//   }
// }

// function willLeave() {
//   return {
//     height: spring(0),
//     opacity: spring(0),
//     x: spring(100, {stiffness: 29, damping: 13 }),
//   }
// }

class MotionGroup extends Component {
  render() {
    const { children, list, willEnter, willLeave, defaultStyles, styles } = this.props
    let extraContent = null

    return (
      <TransitionMotion
        defaultStyles={defaultStyles}
        styles={styles}
        willEnter={willEnter}
        willLeave={willLeave}
      >
        {styles => (
            {
              children(styles)
            }
          {extraContent}
        )}
      </TransitionMotion>
    )
  }
}

export default MotionGroup


// use
<MotionGroup>
  {
    Styles => (

    )
  }
</MotionGroup>