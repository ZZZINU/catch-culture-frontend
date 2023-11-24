import React from 'react';
import Backitem from '../../components/Backitem';
import Level0 from '../../assets/pointimg/level0.png';
import Level1 from '../../assets/pointimg/level1.png';
import Level2 from '../../assets/pointimg/level2.png';
import Level3 from '../../assets/pointimg/level3.png';
import Levelinfo from '../../assets/pointimg/levelinfo.png';
import axios from '../../api/axios';
import './PointLevel.css';

function PointLevel() {
  return (
    <div className="plall">
      <Backitem />
      <div className="mypointinfo">
        MY POINT
        <img className="infoimg" src={Levelinfo} alt="pinfoimg" />
      </div>
      <div className="mylevel">
        <div className="mylevtext">현재 내 등급</div>
        <div className="mylevimg">
          <img className="mylevimgbig" src={Level0} />
          <div className="mylevtextbig">
            Catchy
            <br />
            Green
          </div>
        </div>
        <div className="restlev">
          <div className="rest1">
            <img className="mylevimg1" src={Level1} />
            <div className="mylevtext1">
              Catchy
              <br />
              Yellow
            </div>
          </div>
          <div className="rest2">
            <img className="mylevimg2" src={Level2} />
            <div className="mylevtext2">
              Catchy
              <br />
              Pink
            </div>
          </div>
          <div className="rest3">
            <img className="mylevimg3" src={Level3} />
            <div className="mylevtext3">
              Catchy
              <br />
              Red
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PointLevel;
