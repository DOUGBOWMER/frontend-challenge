import React, { useState } from "react";
import Card from '../components/Card'

const datas = [
  {
    id: 1,
    title: "Gradients",
    subTitle: "Start, end, angle",
    from: "from-purple-900",
    via: "via-blue-500",
    to: "to-green-200",
    icon: "/gradients.svg"
  },
  {
    id: 2,
    title: "Presets",
    subTitle: "Manage presets",
    from: "from-green-200",
    via: "via-green-100",
    to: "to-yellow-200",
    icon: "/presets.svg"
  },
  {
    id: 3,
    title: "Colors",
    subTitle: "Pick any color",
    from: "from-yellow-200",
    via: "via-orange-200",
    to: "to-pink-200",
    icon: "/colors.svg"
  },
];

function Slider() {
  const [temp, setTemp] = useState(0);
  const [posX, setPosX] = useState(0);

  const hasWindow = typeof window !== 'undefined';

  const onMouseDown = (event) => {
    setPosX(event.pageX);
  };

  const onMouseUp = (event) => {
    const curX = event.pageX;
    if (curX > posX && Math.abs(curX - posX) > 10) {
      if (temp > 0) setTemp(temp - 1);
    } else if (Math.abs(curX - posX) > 10) {
      if (temp < 2) setTemp(temp + 1);
    }
  };

  const getTouches = (event) => {
    return event.changedTouches || event.touches;
  };

  const onTouchStart = (event) => {
    const firstTouch = getTouches(event)[0];
    setPosX(firstTouch.clientX);
  };

  const onTouchEnd = (event) => {
    const firstTouch = getTouches(event)[0];
    const curX = firstTouch.clientX;

    if (curX > posX && Math.abs(curX - posX) > 10) {
      if (temp > 0) setTemp(temp - 1);
    } else if (Math.abs(curX - posX) > 10) {
      if (temp < 2) setTemp(temp + 1);
    }
  };

  return (
    <div
      className="flex h-screen flex-row duration-500 overflow-x-hidden"
      style={{
        marginLeft: -temp * (hasWindow ? window.innerWidth : 0)
      }}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
    {
      datas.map((data) => {
        return (
          <Card data={data} key={data.id}/>
        )
      })
    }
    </div>
  )
}

export default Slider;