import React, { useState, useEffect } from 'react';
import Backitem from '../../components/Backitem';
import dayjs from 'dayjs'; //api 반환 받았을 때 사용 예정
import { TbMapPinOff, TbAlertCircleFilled } from 'react-icons/tb';
import './VisitAuthList.css';
import axios from '../../api/axios';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function VisitAuthItem({ data }) {
  VisitAuthItem.propTypes = {
    data: PropTypes.any,
  };

  dayjs.locale('ko');

  if (!data) {
    return;
  }

  return (
    <>
      {data.map(e => (
        <NavLink to={`/visitauth/${e.id}`} key={e.index}>
          <div className="visitautheach" key={e.id}>
            <hr />
            <div className="nickdayrow">
              <p>{e.nickname}</p>
              <p className="visitauthday">
                {e.createdAt === null ? (
                  <></>
                ) : (
                  <>
                    {dayjs(`${e.createdAt}`).format('YYYY.MM.DD - ddd - HH:mm')}
                  </>
                )}
              </p>
            </div>
            <div className="visitadmintitle">{e.title}</div>
          </div>
        </NavLink>
      ))}
    </>
  );
}

export default function VistiAuthList() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [lastid, setLastid] = useState(0);
  const [last, setLast] = useState(false);
  const [first, setFirst] = useState(true);
  const [empty, setEmpty] = useState(false);
  const [numElem, setNumElem] = useState(0);
  const [size, setSize] = useState(0);

  const fetchData = async () => {
    try {
      const res = await axios.get(`admin/visit-auth/list?lastId=${lastid}`);
      setData(res.data.content);
      setLast(res.data.last);
      setFirst(res.data.first);
      setEmpty(res.data.empty);
      setNumElem(res.data.numberOfElements);
      setSize(res.data.size);
      setLastid(res.data.content[12].id);
    } catch (e) {
      console.log(e);
      if (e.response.data.code === 'LOGIN_FAIL') {
        alert('로그인 만료! 다시 로그인 해주세요.');
        navigate(`/`);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onScroll = async () => {
    if (
      window.scrollY + window.innerHeight >
      document.documentElement.scrollHeight - 40
    ) {
      if (last === false && numElem === size) {
        try {
          const res = await axios.get(`admin/visit-auth/list?lastId=${lastid}`);
          setLast(res.data.last);
          setFirst(res.data.first);
          setEmpty(res.data.empty);
          setNumElem(res.data.numberOfElements);
          setSize(res.data.size);
          setData(data.concat(res.data.content));
          setLastid(res.data.content[12].id);
        } catch (e) {
          console.log(e);
          if (e.response.data.code === 'LOGIN_FAIL') {
            alert('로그인 만료! 다시 로그인 해주세요.');
            navigate(`/`);
          }
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll());
    window.addEventListener('touchmove', onScroll());
    return () => {
      window.removeEventListener('scroll', onScroll());
      window.removeEventListener('touchmove', onScroll());
    };
  }, [lastid, numElem]);

  return (
    <div className="authlistwrap">
      <Backitem />
      <div className="authlistcontent">
        <div className="visitauthtextrow">
          <p>방문 인증 요청</p>
        </div>
        <div className="visitauthlist">
          {first === true && empty === true ? (
            <div className="novisiticon">
              <TbMapPinOff size="140" color="#018c0d" />
              <p className="novisitauthtext">방문 인증 요청 없음</p>
            </div>
          ) : (
            <>
              <VisitAuthItem data={data} />
              <hr />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
