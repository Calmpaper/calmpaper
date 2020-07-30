import React from 'react'

export default ({ description }) => (
  <div className="row row01">
    {/*
    <h4 className="title size04">Synopsis</h4>
    */}
    <div
      className="text"
      dangerouslySetInnerHTML={{
        __html: description.replace(/(?:\r\n|\r|\n)/g, '<br />'),
      }}
      style={{ lineHeight: '160%' }}
    />
  </div>
)
