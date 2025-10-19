import React, { useState } from "react";

const Tooltip = ({ children, text, position = "top" }) => {
  const [show, setShow] = useState(false);

  const positionClasses = {
    top: "bottom-full mb-2 left-1/2 -translate-x-1/2",
    bottom: "top-full mt-2 left-1/2 -translate-x-1/2",
    left: "right-full mr-2 top-1/2 -translate-y-1/2",
    right: "left-full ml-2 top-1/2 -translate-y-1/2",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
           className={`absolute ${positionClasses[position]} whitespace-pre-line w-[200px] bg-lightMain dark:bg-dlightMain2 text-lighhtTxt
            dark:text-dlightTxt text-[0.7rem] px-2 py-1 rounded-md shadow-lg z-[10] transition-opacity duration-200`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
