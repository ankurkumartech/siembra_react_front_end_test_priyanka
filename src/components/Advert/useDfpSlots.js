import { useEffect } from "react";

const useDfpSlot = ({ path, size, id }) => {
  //console.log(path,id);
  useEffect(() => {
    const googletag = window.googletag || {};
    googletag.cmd = googletag.cmd || [];
    googletag.cmd.push(function() {
      var mapping = googletag
        .sizeMapping()
        .addSize([1000, 0], [468, 60])
        .addSize([0, 0], [[300, 50]])
        .build();
      googletag.destroySlots();
      googletag
        .defineSlot(path, size, id)
        .defineSizeMapping(mapping)
        //.setTargeting('GradeKey', ['10', '11', '12', '9'])
        .addService(googletag.pubads());
      googletag.pubads().disableInitialLoad();
      googletag.pubads().enableSingleRequest();
      var timesRun = 0;
      var interval = setInterval(function() {
        timesRun += 1;
        if (timesRun === 2) {
          console.log("called from clear interval", timesRun);
          clearInterval(interval);
        }
        console.log("called from interval", timesRun);
        googletag.pubads().refresh();
      }, 1000);
      googletag.pubads().collapseEmptyDivs();
      googletag.enableServices();
      console.log("googletag:==== ", googletag);
    });
  }, [path, id]);
};

export default useDfpSlot;
