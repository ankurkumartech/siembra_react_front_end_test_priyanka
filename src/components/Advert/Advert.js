import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import adpic from "../../assets/utils/images/ads.png";
import Storage from "../../services/Storage";
import "./Advert.scss";
// import useDfpSlot from "./useDfpSlots.js";
import { Bling as GPT } from "react-gpt";

GPT.enableSingleRequest();

function Advert() {
  const API_URL = process.env.REACT_APP_API_URL;
  const token = Storage.getTokenInCookie("token");

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const [adDivId, setAdDivId] = useState("");
  const [adPath, setAdPath] = useState("");

  useEffect(() => {
    showAd();
  }, []);

  const showAd = () => {
    fetch(`${API_URL}/api/v1/result/googleads`, {
      method: "POST",
      headers: {
        "x-authorization": `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAdDivId(data.advdetail[0].adv_id);
        setAdPath(data.advdetail[0].path);
      });
  };

  return (
    <>
      {adDivId && adPath ?
        <div id={adDivId} className='advSlider'>
          <GPT
            adUnitPath={adPath}
            slotSize={[468, 60]}
          />
        </div>
        // <Slider {...settings} className='advSlider'>
        //   <div className="ads-main">
        //     <div id={adDivId}>
        //       <GPT adUnitPath={adPath} slotSize={[468, 60]} />
        //     </div>
        //   </div>
        //   <div className="ads-main">
        //     <img src={adpic} alt="img" />
        //   </div>
        //   <div className="ads-main">
        //     <img src={adpic} alt="img" />
        //   </div>
        // </Slider>
        : ''}

      {/* <Gpt 
        adUnit={adPath}
        name="ad-name"
        size={[468, 60]}
    /> */}
      {/* <Slider {...settings}>
        <div className="ads-main">
          <div id={adDivId}>
            <GPT adUnitPath={adPath} slotSize={[468, 60]} />
          </div>
        </div>
        <div className="ads-main">
          <img src={adpic} alt="img" />
        </div>
      </Slider> */}
    </>
  );
}

export default Advert;
