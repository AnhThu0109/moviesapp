import React from 'react';

function VideoPlayer(props) {
  return (
    <span className='pe-3'>
      <video controls width="400px">
        <source src={props.src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </span>
  );
}

export default VideoPlayer;