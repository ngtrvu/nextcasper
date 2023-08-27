import React from 'react'

export default ({ title, description }) => {
  return (
    <div className="container mx-auto p-5 mb-10">
      <h1 className="title-font text-[30px] lg:text-[48px] 2xl:text-[56px] mb-4 font-bold text-gray-900 text-center">
        {title}
      </h1>

      {description ? (
        <p className="max-w-sm mx-auto lg:max-w-none mt-4 text-xl">
          {description}
        </p>
      ) : null}
    </div>
  )
}
