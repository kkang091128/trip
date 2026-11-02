/**
 * KoreaTrip 지도 및 시스템 환경 설정 모듈
 *
 * API 키가 소스 코드에 직접 노출되지 않도록 설계되었으며,
 * 별도 키가 설정되지 않은 경우에도 실제 OpenStreetMap 및 고해상도 CartoDB 타일로
 * 100% 정상 작동하는 인터랙티브 지도를 제공합니다.
 */

window.KOREATRIP_CONFIG = {
  // 기본 타일 공급자: 'osm' (OpenStreetMap) | 'cartodb' (CartoDB Voyager) | 'vworld' (국가공간정보포털)
  tileProvider: 'osm',

  // VWorld 타일 사용 시 API 키 (미설정 시 OSM으로 안전하게 폴백)
  vworldApiKey: '',

  // Kakao / Naver 지도 연동용 설정 (선택 사항)
  kakaoApiKey: '',
  naverClientId: '',

  // 타일 레이어 정의
  tileLayers: {
    osm: {
      name: '오픈스트리트맵 (기본)',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
      }
    },
    cartodb: {
      name: 'CartoDB 보이저 (모던)',
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      options: {
        maxZoom: 19,
        attribution: '&copy; <a href="https://carto.com/">CARTO</a>'
      }
    },
    vworld: {
      name: 'VWorld 국가공간정보',
      url: 'https://api.vworld.kr/req/wmts/1.0.0/{apiKey}/Base/{z}/{y}/{x}.png',
      options: {
        maxZoom: 19,
        attribution: '&copy; 국토교통부 VWorld'
      }
    }
  },

  // 대한민국 중심 좌표 및 기본 줌
  defaultCenter: [36.2, 127.8],
  defaultZoom: 7
};
