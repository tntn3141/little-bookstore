// Meant to render recommended items

import React from "react";

export default function SmallItem(props) {
  return (
    <div className="flex flex-col mx-auto my-4">
      <div className="mx-auto">
        <img
          src={props.coverImage}
          alt={`${props.title} cover`}
        />
      </div>
      <h2>{props.title}</h2>
      <p>{props.price}</p>
    </div>
  );
}
