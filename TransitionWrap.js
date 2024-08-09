import React, { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import PropTypes from 'prop-types';
import './index.css'; // Import CSS file for animations

const TransitionWrap = ({ children, show, anim }) => {
    const anims = {
      fadeInOut: {
        enter: 'fadeInOut-enter',
        enterActive: 'fadeInOut-enter-active',
        leave: 'fadeInOut-leave',
        leaveActive: 'fadeInOut-leave-active',
      },
    };
  
    const { enter, enterActive, leave, leaveActive } = anims[anim];
  
    return (
      <Transition
        show={show}
        enter={enter}
        enterFrom={enter}
        enterTo={enterActive}
        leave={leave}
        leaveFrom={leave}
        leaveTo={leaveActive}
      >
        {children}
      </Transition>
    );
  };
  
  TransitionWrap.defaultProps = {
    anim: 'fadeInOut',
  };
  
  TransitionWrap.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
    show: PropTypes.bool.isRequired,
    anim: PropTypes.string.isRequired,
  };
  
  export default TransitionWrap;