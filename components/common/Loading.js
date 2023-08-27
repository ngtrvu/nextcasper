import React from "react";

const Loading = ({ loading }) => {
  return (
    <div
      className='fixed h-full w-full top-0 left-0 bg-black bg-opacity-[0.1] flex justify-center items-center transition-all duration-900'
      style={{
        opacity: loading ? 1 : 0,
        visibility: loading ? "visible" : "hidden",
      }}>
      <div>
        <svg version='1.1' id='Layer_1' width='24px' height='40px'>
          <rect x='0' y='13' width='5' height='5' fill='#FF6700'>
            <animate
              attributeName='height'
              attributeType='XML'
              values='5;30;5'
              begin='0s'
              dur='0.6s'
              repeatCount='indefinite'
            />
            <animate
              attributeName='y'
              attributeType='XML'
              values='13; 5; 13'
              begin='0s'
              dur='0.6s'
              repeatCount='indefinite'
            />
          </rect>
          <rect x='10' y='13' width='5' height='5' fill='#FF6700'>
            <animate
              attributeName='height'
              attributeType='XML'
              values='5;30;5'
              begin='0.15s'
              dur='0.6s'
              repeatCount='indefinite'
            />
            <animate
              attributeName='y'
              attributeType='XML'
              values='13; 5; 13'
              begin='0.15s'
              dur='0.6s'
              repeatCount='indefinite'
            />
          </rect>
          <rect x='20' y='13' width='5' height='5' fill='#FF6700'>
            <animate
              attributeName='height'
              attributeType='XML'
              values='5;30;5'
              begin='0.3s'
              dur='0.6s'
              repeatCount='indefinite'
            />
            <animate
              attributeName='y'
              attributeType='XML'
              values='13; 5; 13'
              begin='0.3s'
              dur='0.6s'
              repeatCount='indefinite'
            />
          </rect>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
