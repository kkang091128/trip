/**
 * KoreaTrip 전국 행정구역 계층 데이터베이스 (Hierarchy Database)
 * 구조: 대한민국 -> 시도(Sido) -> 시군구(Sigungu) -> 읍면동(DongTown) -> 세부 마을(Village)
 *
 * 새로운 지역이 추가되면 UI(사이드바, 브레드크럼, 필터, 지도)에 100% 자동 반영되는 데이터 중심 구조입니다.
 */

window.KOREA_REGIONS_DATA = [
  {
    code: "11",
    name: "서울특별시",
    shortName: "서울",
    lat: 37.5665,
    lng: 126.9780,
    zoom: 11,
    sigungus: [
      {
        code: "11110",
        name: "종로구",
        lat: 37.5730,
        lng: 126.9794,
        zoom: 14,
        dongTowns: [
          {
            code: "11110101",
            name: "사직동/세종로",
            lat: 37.5760,
            lng: 126.9730,
            zoom: 15,
            villages: ["경복궁마을", "통의동골목", "적선마을"]
          },
          {
            code: "11110102",
            name: "가회동/삼청동",
            lat: 37.5826,
            lng: 126.9835,
            zoom: 15,
            villages: ["북촌한옥마을", "계동골목", "삼청카페거리"]
          },
          {
            code: "11110103",
            name: "종로1·2·3·4가동",
            lat: 37.5700,
            lng: 126.9994,
            zoom: 15,
            villages: ["광장전통마을", "익선동한옥마을", "종묘돌담길"]
          }
        ]
      },
      {
        code: "11440",
        name: "마포구",
        lat: 37.5563,
        lng: 126.9236,
        zoom: 14,
        dongTowns: [
          {
            code: "11440101",
            name: "서교동/연남동",
            lat: 37.5563,
            lng: 126.9236,
            zoom: 15,
            villages: ["연트럴파크숲길마을", "홍대예술거리", "당인리문화거리"]
          }
        ]
      },
      {
        code: "11680",
        name: "강남구",
        lat: 37.5172,
        lng: 127.0473,
        zoom: 14,
        dongTowns: [
          {
            code: "11680101",
            name: "삼성동/압구정동",
            lat: 37.5130,
            lng: 127.0580,
            zoom: 15,
            villages: ["코엑스별마당마을", "로데오거리", "선정릉숲길"]
          }
        ]
      }
    ]
  },
  {
    code: "41",
    name: "경기도",
    shortName: "경기",
    lat: 37.4138,
    lng: 127.5183,
    zoom: 10,
    sigungus: [
      {
        code: "41110",
        name: "수원시",
        lat: 37.2804,
        lng: 127.0163,
        zoom: 13,
        dongTowns: [
          {
            code: "41110101",
            name: "행궁동/팔달로",
            lat: 37.2888,
            lng: 127.0145,
            zoom: 15,
            villages: ["화서문마을", "행리단공방거리", "방화수류정마을"]
          }
        ]
      },
      {
        code: "41830",
        name: "양평군",
        lat: 37.4913,
        lng: 127.4875,
        zoom: 12,
        dongTowns: [
          {
            code: "41830101",
            name: "양서면",
            lat: 37.5310,
            lng: 127.3160,
            zoom: 14,
            villages: ["두물머리마을", "세미원연꽃마을"]
          }
        ]
      }
    ]
  },
  {
    code: "46",
    name: "전라남도",
    shortName: "전남",
    lat: 34.8679,
    lng: 126.9910,
    zoom: 9,
    sigungus: [
      {
        code: "46110",
        name: "목포시",
        lat: 34.8119,
        lng: 126.3922,
        zoom: 13,
        guideId: "mokpo",
        dongTowns: [
          {
            code: "46110101",
            name: "유달동",
            lat: 34.7865,
            lng: 126.3792,
            zoom: 15,
            villages: ["근대개항거리", "노적봉마을", "온금동다순구미"]
          },
          {
            code: "46110102",
            name: "서산동",
            lat: 34.7900,
            lng: 126.3750,
            zoom: 15,
            villages: ["시화골목", "보리마당마을", "연희네골목"]
          },
          {
            code: "46110103",
            name: "상동/평화광장",
            lat: 34.7980,
            lng: 126.4250,
            zoom: 15,
            villages: ["평화광장오션거리", "갓바위바다마을", "하당미식타운"]
          },
          {
            code: "46110104",
            name: "고하도/대반동",
            lat: 34.7700,
            lng: 126.3600,
            zoom: 14,
            villages: ["고하도해안마을", "대반동스카이마을"]
          }
        ]
      },
      {
        code: "46170",
        name: "나주시",
        lat: 35.0158,
        lng: 126.7108,
        zoom: 13,
        guideId: "naju",
        dongTowns: [
          {
            code: "46170101",
            name: "금남동/성북동",
            lat: 35.0250,
            lng: 126.7120,
            zoom: 15,
            villages: ["금성관역사마을", "원조곰탕거리", "나주읍성서성문마을"]
          },
          {
            code: "46170102",
            name: "빛가람동",
            lat: 35.0180,
            lng: 126.7800,
            zoom: 15,
            villages: ["호수공원전망마을", "스마트혁신마을"]
          },
          {
            code: "46170103",
            name: "영산동",
            lat: 35.0090,
            lng: 126.7210,
            zoom: 15,
            villages: ["영산포홍어거리", "황포돛배나루터마을", "영산강자전거마을"]
          }
        ]
      },
      {
        code: "46130",
        name: "여수시",
        lat: 34.7604,
        lng: 127.6622,
        zoom: 13,
        dongTowns: [
          {
            code: "46130101",
            name: "동문동/중앙동",
            lat: 34.7450,
            lng: 127.7500,
            zoom: 15,
            villages: ["오동도동백마을", "고소동천사벽화마을", "이순신광장거리"]
          },
          {
            code: "46130102",
            name: "돌산읍",
            lat: 34.6980,
            lng: 127.7400,
            zoom: 14,
            villages: ["돌산공원마을", "향일암해돋이마을"]
          }
        ]
      },
      {
        code: "46150",
        name: "순천시",
        lat: 34.9506,
        lng: 127.4872,
        zoom: 13,
        dongTowns: [
          {
            code: "46150101",
            name: "도사동/대대동",
            lat: 34.9250,
            lng: 127.5050,
            zoom: 14,
            villages: ["순천만갈대마을", "국가정원마을", "와온일몰마을"]
          },
          {
            code: "46150102",
            name: "낙안면",
            lat: 34.9080,
            lng: 127.3400,
            zoom: 14,
            villages: ["낙안읍성민속마을", "초가돌담마을"]
          }
        ]
      },
      {
        code: "46710",
        name: "담양군",
        lat: 35.3211,
        lng: 126.9882,
        zoom: 13,
        dongTowns: [
          {
            code: "46710101",
            name: "담양읍",
            lat: 35.3211,
            lng: 126.9882,
            zoom: 14,
            villages: ["죽녹원대숲마을", "관방제림마을", "창평슬로시티마을"]
          }
        ]
      },
      {
        code: "46820",
        name: "해남군",
        lat: 34.5735,
        lng: 126.5989,
        zoom: 12,
        dongTowns: [
          {
            code: "46820101",
            name: "송지면",
            lat: 34.3010,
            lng: 126.5250,
            zoom: 14,
            villages: ["땅끝마을", "갈두리해안마을", "미황사달마고도마을"]
          }
        ]
      },
      {
        code: "46910",
        name: "신안군",
        lat: 34.8336,
        lng: 126.1089,
        zoom: 11,
        dongTowns: [
          {
            code: "46910101",
            name: "안좌면/반월도",
            lat: 34.6900,
            lng: 126.1300,
            zoom: 14,
            villages: ["보라빛퍼플섬마을", "박지도바다마을"]
          },
          {
            code: "46910102",
            name: "증도면",
            lat: 35.0020,
            lng: 126.1650,
            zoom: 13,
            villages: ["태평염전슬로마을", "우전해변솔숲마을"]
          }
        ]
      },
      {
        code: "46900",
        name: "완도군",
        lat: 34.3110,
        lng: 126.7550,
        zoom: 12,
        dongTowns: [
          {
            code: "46900101",
            name: "완도읍/청산면",
            lat: 34.3150,
            lng: 126.7500,
            zoom: 13,
            villages: ["청산도서편제마을", "완도타워해안마을", "정도리구계등마을"]
          }
        ]
      }
    ]
  },
  {
    code: "29",
    name: "광주광역시",
    shortName: "광주",
    lat: 35.1595,
    lng: 126.8526,
    zoom: 12,
    guideId: "gwangju",
    sigungus: [
      {
        code: "29110",
        name: "동구",
        lat: 35.1440,
        lng: 126.9170,
        zoom: 14,
        dongTowns: [
          {
            code: "29110101",
            name: "문화전당로/양림동",
            lat: 35.1440,
            lng: 126.9170,
            zoom: 15,
            villages: ["국립아시아문화전당마을", "양림역사문화마을", "펭귄마을"]
          },
          {
            code: "29110102",
            name: "학운동/증심사",
            lat: 35.1380,
            lng: 126.9850,
            zoom: 14,
            villages: ["무등산증심사계곡마을", "의재미술관숲길"]
          }
        ]
      },
      {
        code: "29200",
        name: "광산구",
        lat: 35.1385,
        lng: 126.7905,
        zoom: 14,
        dongTowns: [
          {
            code: "29200101",
            name: "송정동",
            lat: 35.1385,
            lng: 126.7905,
            zoom: 15,
            villages: ["1913송정역레트로시장마을", "송정떡갈비골목"]
          }
        ]
      },
      {
        code: "29170",
        name: "북구",
        lat: 35.1740,
        lng: 126.9120,
        zoom: 14,
        dongTowns: [
          {
            code: "29170101",
            name: "운정동",
            lat: 35.2340,
            lng: 126.9370,
            zoom: 14,
            villages: ["국립5·18민주묘지마을"]
          }
        ]
      }
    ]
  },
  {
    code: "42",
    name: "강원특별자치도",
    shortName: "강원",
    lat: 37.7519,
    lng: 128.8760,
    zoom: 9,
    sigungus: [
      {
        code: "42150",
        name: "강릉시",
        lat: 37.7519,
        lng: 128.8760,
        zoom: 13,
        dongTowns: [
          {
            code: "42150101",
            name: "견소동/안목",
            lat: 37.7718,
            lng: 128.9482,
            zoom: 15,
            villages: ["안목커피거리마을", "경포호수마을", "초당순두부마을"]
          }
        ]
      },
      {
        code: "42210",
        name: "속초시",
        lat: 38.2070,
        lng: 128.5918,
        zoom: 13,
        dongTowns: [
          {
            code: "42210101",
            name: "조양동/중앙동",
            lat: 38.1930,
            lng: 128.6045,
            zoom: 15,
            villages: ["속초해변아이마을", "아바이순대마을", "영금정바다마을"]
          }
        ]
      },
      {
        code: "42110",
        name: "춘천시",
        lat: 37.8813,
        lng: 127.7298,
        zoom: 13,
        dongTowns: [
          {
            code: "42110101",
            name: "남산면/도심",
            lat: 37.7915,
            lng: 127.5255,
            zoom: 14,
            villages: ["남이섬메타세쿼이아마을", "명동닭갈비골목", "소양강스카이마을"]
          }
        ]
      }
    ]
  },
  {
    code: "30",
    name: "대전광역시",
    shortName: "대전",
    lat: 36.3504,
    lng: 127.3845,
    zoom: 12,
    sigungus: [
      {
        code: "30140",
        name: "중구",
        lat: 36.3277,
        lng: 127.4273,
        zoom: 14,
        dongTowns: [
          {
            code: "30140101",
            name: "은행선화동",
            lat: 36.3277,
            lng: 127.4273,
            zoom: 15,
            villages: ["성심당본점거리", "으능정이문화거리", "대흥동카페골목"]
          }
        ]
      },
      {
        code: "30200",
        name: "유성구",
        lat: 36.3750,
        lng: 127.3850,
        zoom: 14,
        dongTowns: [
          {
            code: "30200101",
            name: "온천동/도룡동",
            lat: 36.3750,
            lng: 127.3850,
            zoom: 15,
            villages: ["엑스포한빛탑마을", "유성온천거리"]
          }
        ]
      }
    ]
  },
  {
    code: "44",
    name: "충청남도",
    shortName: "충남",
    lat: 36.5184,
    lng: 126.8000,
    zoom: 10,
    sigungus: [
      {
        code: "44150",
        name: "공주시",
        lat: 36.4465,
        lng: 127.1190,
        zoom: 13,
        dongTowns: [
          {
            code: "44150101",
            name: "금성동/웅진동",
            lat: 36.4630,
            lng: 127.1265,
            zoom: 15,
            villages: ["백제공산성마을", "무령왕릉고분마을", "공주한옥마을"]
          }
        ]
      }
    ]
  },
  {
    code: "43",
    name: "충청북도",
    shortName: "충북",
    lat: 36.6357,
    lng: 127.4912,
    zoom: 10,
    sigungus: [
      {
        code: "43800",
        name: "단양군",
        lat: 36.9845,
        lng: 128.3655,
        zoom: 12,
        dongTowns: [
          {
            code: "43800101",
            name: "매포읍/단양읍",
            lat: 36.9960,
            lng: 128.3710,
            zoom: 14,
            villages: ["도담삼봉강마을", "만천하절벽마을", "구경시장마늘거리"]
          }
        ]
      }
    ]
  },
  {
    code: "45",
    name: "전북특별자치도",
    shortName: "전북",
    lat: 35.7175,
    lng: 127.1530,
    zoom: 10,
    sigungus: [
      {
        code: "45110",
        name: "전주시",
        lat: 35.8242,
        lng: 127.1480,
        zoom: 13,
        dongTowns: [
          {
            code: "45110101",
            name: "완산구 교동/풍남동",
            lat: 35.8150,
            lng: 127.1530,
            zoom: 15,
            villages: ["전주한옥마을", "경기전돌담마을", "자만벽화마을"]
          }
        ]
      }
    ]
  },
  {
    code: "26",
    name: "부산광역시",
    shortName: "부산",
    lat: 35.1796,
    lng: 129.0756,
    zoom: 11,
    sigungus: [
      {
        code: "26350",
        name: "해운대구",
        lat: 35.1587,
        lng: 129.1604,
        zoom: 14,
        dongTowns: [
          {
            code: "26350101",
            name: "우동/중동/송정",
            lat: 35.1587,
            lng: 129.1604,
            zoom: 15,
            villages: ["해운대백사장마을", "미포블루라인철길마을", "송정서핑거리"]
          }
        ]
      },
      {
        code: "26380",
        name: "사하구",
        lat: 35.0975,
        lng: 129.0107,
        zoom: 14,
        dongTowns: [
          {
            code: "26380101",
            name: "감천동",
            lat: 35.0975,
            lng: 129.0107,
            zoom: 15,
            villages: ["감천문화어린왕자마을", "다대포낙조마을"]
          }
        ]
      }
    ]
  },
  {
    code: "47",
    name: "경상북도",
    shortName: "경북",
    lat: 36.4919,
    lng: 128.8889,
    zoom: 9,
    sigungus: [
      {
        code: "47130",
        name: "경주시",
        lat: 35.8562,
        lng: 129.2247,
        zoom: 13,
        dongTowns: [
          {
            code: "47130101",
            name: "황남동/월성동",
            lat: 35.8340,
            lng: 129.2260,
            zoom: 15,
            villages: ["황리단길감성마을", "동궁과월지야경마을", "첨성대꽃단지"]
          }
        ]
      }
    ]
  },
  {
    code: "50",
    name: "제주특별자치도",
    shortName: "제주",
    lat: 33.3846,
    lng: 126.5535,
    zoom: 10,
    sigungus: [
      {
        code: "50110",
        name: "제주시",
        lat: 33.4996,
        lng: 126.5312,
        zoom: 12,
        dongTowns: [
          {
            code: "50110101",
            name: "한림읍/협재",
            lat: 33.3941,
            lng: 126.2397,
            zoom: 14,
            villages: ["협재에메랄드바다마을", "금능은모래마을", "비양도섬마을"]
          },
          {
            code: "50110102",
            name: "구좌읍/월정리",
            lat: 33.5550,
            lng: 126.7960,
            zoom: 14,
            villages: ["월정리카페거리마을", "김녕요트마을"]
          }
        ]
      },
      {
        code: "50130",
        name: "서귀포시",
        lat: 33.2541,
        lng: 126.5601,
        zoom: 12,
        dongTowns: [
          {
            code: "50130101",
            name: "성산읍",
            lat: 33.4587,
            lng: 126.9425,
            zoom: 14,
            villages: ["성산일출봉마을", "광치기해변마을", "섭지코지바다마을"]
          },
          {
            code: "50130102",
            name: "중문동",
            lat: 33.2480,
            lng: 126.4130,
            zoom: 14,
            villages: ["주상절리대마을", "중문색달해변마을"]
          }
        ]
      }
    ]
  }
];
