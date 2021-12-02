import React from "react";
import Image from 'next/image'

function Card(props) {
  return (
    <div>
      <div className="h-1/2 content-center mx-auto flex flex-wrap">
        <div className={"h-10 w-10 align-middle text-center mx-auto rounded-full pt-1 bg-gradient-to-tr " + props.data.from + ' ' + props.data.via + ' ' + props.data.to}>
          <h1 className="text-white font-medium shadow-sm text-2xl ">{props.data.id}</h1>
        </div>
        <div className="text-center w-full block pb-4">
          <p className="text-black text-5xl font-extrabold big-text mt-5" style={{ userSelect: "none" }}>
            {props.data.title}
          </p>
          <p className="text-3xl text-gray-500 mt-2" style={{ userSelect: "none" }}>
            {props.data.subTitle}
          </p>
        </div>
      </div>
      <div className={"h-1/2 w-screen content-center flex flex-wrap bg-gradient-to-r " + props.data.from + ' ' + props.data.via + ' ' + props.data.to}>
        <div className="mx-auto relative content-center">
          <Image
            src={props.data.icon}
            className="mx-auto"
            alt={props.data.title}
            width="80px"
            height="80px"
          />
        </div>
      </div>
    </div>
  );
}

export default Card;
