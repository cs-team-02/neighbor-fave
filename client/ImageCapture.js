import React, { useEffect } from 'react';

export default function ImageCapture() {
  return (
    <div id='camera'>
      <canvas id='camera--sensor'></canvas>
      <video id='camera--view' autoPlay playsInline></video>
      <img src='//:0' alt='' id='camera--output' />
      <button id='camera--trigger'>Take a picture</button>
    </div>
  );
}
