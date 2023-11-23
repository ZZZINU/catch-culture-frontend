import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './style';
import LogoImg from '../../assets/images/logo.png';

import BannerImg1 from '../../assets/images/main/banner1.png';
import BannerImg2 from '../../assets/images/main/banner2.png';
import BannerImg3 from '../../assets/images/main/banner3.png';
import EventCard from '../../components/eventCard/EventCard';
import SearchBox from '../../components/search/searchBox/SearchBox';

// api
import axios from '../../api/axios';

// 슬라이더
import { SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

function Main() {
  // data
  const [data, setData] = useState([]);

  // 초기
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('cultural-event');

      //데이터 저장
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <S.MainWrapper>
        {/* 헤더 */}
        <S.Header>
          <S.HeaderLogo src={LogoImg} alt="로고 이미지" />
          <SearchBox width={'180px'} />
        </S.Header>

        {/* 배너 */}
        <S.Banner>
          <S.MySwiper pagination={true} modules={[Pagination]}>
            <SwiperSlide>
              {/* <S.SwiperSlideImg src={BannerImg1} alt="배너 이미지" /> */}
              <S.SwiperSlideImg
                src="https://storage.googleapis.com/elegant-bucket/jinwoo.png"
                alt="배너 이미지"
              />
            </SwiperSlide>
            <SwiperSlide>
              <S.SwiperSlideImg src={BannerImg2} alt="배너 이미지" />
            </SwiperSlide>
            <SwiperSlide>
              <S.SwiperSlideImg src={BannerImg3} alt="배너 이미지" />
            </SwiperSlide>
          </S.MySwiper>
        </S.Banner>

        {/*문화 행사 목록*/}
        <S.EventWrapper>
          <S.EventHeader>
            <S.EventHeaderTitle>이런 행사는 어떠세요?</S.EventHeaderTitle>
            <Link to="/search">
              <S.EventHeaderMore>더보기</S.EventHeaderMore>
            </Link>
          </S.EventHeader>
          <EventCard data={data} />
        </S.EventWrapper>
      </S.MainWrapper>
    </>
  );
}

export default Main;
