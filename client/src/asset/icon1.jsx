import React from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

defineElement(lottie.loadAnimation);
const icon1 = () => {
  return (
    <div >
    <lord-icon
     style={{ width: '30px', height: '30px' }}
      src="https://cdn.lordicon.com/edxgdhxu.json"
      trigger="hover"
      colors="primary:#4be1ec,secondary:#cb5eee"
      stroke="90"
      state="hover-2"
    ></lord-icon>
  </div>)
}

export default icon1
