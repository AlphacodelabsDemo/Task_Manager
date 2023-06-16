import React from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);
const icon1 = () => {
  return (
    <div >
     <lord-icon
      style={{ width: '25px', height: '30px' }}
    src="https://cdn.lordicon.com/tntmaygd.json"
    trigger="morph"
    colors="primary:#4be1ec,secondary:#cb5eee"
    stroke="90"
    state="morph-trash-in"
    
    />

      </div>)
}

export default icon1
