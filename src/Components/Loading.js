import React from "react";

export default function Loading({ isLoading }) {
  return (
    <>
      {isLoading && (
        <div className="overlay">
          <div className="fancy-spinner">
            <div className="ring"></div>
            <div className="ring"></div>
            <div className="dot"></div>
          </div>
        </div>
      )}
    </>
  );
}
