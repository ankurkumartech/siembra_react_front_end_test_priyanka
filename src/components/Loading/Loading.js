import React from "react";
import Loader from "react-loaders";
import "./Loading.scss";
/**
 *
 * @description Loading component use for show pulse loader
 */
function Loading() {
  return (
    <>
      <div className="loader-container">
        <div className="loader-container-inner">
          <div className="text-center">
            <Loader
              type="ball-clip-rotate"
              className="customLoader"
            />
          </div>
        </div>

        {/* <div class="spinner-box">
          <div class="circle-border">
            <div class="circle-core"></div>
          </div>
        </div> */}

      </div>
    </>
  );
}

export default Loading;
