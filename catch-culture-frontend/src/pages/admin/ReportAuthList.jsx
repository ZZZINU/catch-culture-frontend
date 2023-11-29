import React, { useState, useEffect } from 'react';
import Backitem from '../../components/Backitem';
import * as dayjs from 'dayjs'; //api 반환 받았을 때 사용 예정
import { TbReportOff } from 'react-icons/tb';
import './VisitAuthList.css';

export default function ReportAuthList() {
  const cnt = 12;
  const nickname = '이름';
  const title = '제목';
  const createdAt = '2023-11-29 04:00:24';
  return (
    <div className="authlistwrap">
      <Backitem />
      <div className="authlistcontent">
        <div className="visitauthtextrow">
          <p>문화행사 제보</p>
          <div className="visitauthcnt">총 {cnt}개 </div>
        </div>
        <div className="visitauthlist">
          {cnt === 0 ? (
            <div className="novisiticon">
              <TbReportOff size="140" color="#018c0d" />
              <p div className="novisitauthtext">
                제보 받은 문화 행사 없음
              </p>
            </div>
          ) : (
            <div className="visitautheach">
              <hr />
              <div className="nickdayrow">
                <p>{nickname}</p>
                <p className="visitauthday">{createdAt}</p>
              </div>
              <p>{title}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
