// KoreaTrip Comprehensive Regional Travel Database
window.KOREA_TRIP_REGIONS = {
    "전체": { lat: 36.2, lng: 127.8, zoom: 7 },
    "수도권": { lat: 37.5665, lng: 126.9780, zoom: 10 },
    "강원권": { lat: 37.7519, lng: 128.8760, zoom: 9 },
    "충청권": { lat: 36.3504, lng: 127.3845, zoom: 9 },
    "전라권": { lat: 35.1595, lng: 126.8526, zoom: 9 },
    "경상권": { lat: 35.5384, lng: 129.1114, zoom: 9 },
    "제주권": { lat: 33.3846, lng: 126.5535, zoom: 10 }
};

window.KOREA_TRIP_DATA = [
    // ================= 수도권 =================
    {
        id: "seoul",
        name: "서울특별시",
        region: "수도권",
        lat: 37.5665,
        lng: 126.9780,
        sigungus: [
            {
                name: "종로구",
                attractions: [
                    {
                        id: "seoul-gyeongbokgung",
                        name: "경복궁 & 북촌한옥마을",
                        lat: 37.5796,
                        lng: 126.9770,
                        category: "역사/문화",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1546874177-9e664107314e?w=800&q=80",
                        desc: "조선 왕조의 법궁 경복궁과 고즈넉한 전통 한옥 골목이 어우러진 서울의 대표 랜드마크입니다."
                    },
                    {
                        id: "seoul-gwangjang",
                        name: "광장시장 먹자골목",
                        lat: 37.5700,
                        lng: 126.9994,
                        category: "미식/시장",
                        theme: "미식탐방",
                        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
                        desc: "바삭한 녹두빈대떡과 육회, 마약김밥 등 활기찬 한국 전통 시장의 진정한 맛을 즐길 수 있습니다."
                    }
                ]
            },
            {
                name: "마포구",
                attractions: [
                    {
                        id: "seoul-hongdae",
                        name: "홍대 거리 & 연남동 경의선 숲길",
                        lat: 37.5563,
                        lng: 126.9236,
                        category: "쇼핑/예술",
                        theme: "감성여행",
                        image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
                        desc: "젊음의 열정이 넘치는 버스킹 거리와 감각적인 카페, 레스토랑이 이어지는 핫플레이스입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "suwon",
        name: "경기도 수원시",
        region: "수도권",
        lat: 37.2804,
        lng: 127.0163,
        sigungus: [
            {
                name: "팔달구",
                attractions: [
                    {
                        id: "suwon-hwaseong",
                        name: "수원화성 & 행궁동 공방거리",
                        lat: 37.2888,
                        lng: 127.0145,
                        category: "역사/문화",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
                        desc: "유네스코 세계문화유산인 수원화성 성곽길을 따라 걸으며 행리단길의 정취를 만끽하는 코스입니다."
                    }
                ]
            }
        ]
    },

    // ================= 강원권 =================
    {
        id: "gangneung",
        name: "강원특별자치도 강릉시",
        region: "강원권",
        lat: 37.7519,
        lng: 128.8760,
        sigungus: [
            {
                name: "안목/경포",
                attractions: [
                    {
                        id: "gangneung-anmok",
                        name: "안목해변 커피거리",
                        lat: 37.7718,
                        lng: 128.9482,
                        category: "바다/카페",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
                        desc: "푸른 동해 바다를 바라보며 핸드드립 커피와 디저트를 즐길 수 있는 대한민국 대표 커피 명소입니다."
                    },
                    {
                        id: "gangneung-gyeongpo",
                        name: "경포호 & 경포해변",
                        lat: 37.7960,
                        lng: 128.9070,
                        category: "자연/호수",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
                        desc: "자전거를 타고 둘러보는 잔잔한 호수 산책로와 솔숲 너머 시원하게 펼쳐진 백사장의 조화."
                    }
                ]
            }
        ]
    },
    {
        id: "sokcho",
        name: "강원특별자치도 속초시",
        region: "강원권",
        lat: 38.2070,
        lng: 128.5918,
        sigungus: [
            {
                name: "조양동/대포항",
                attractions: [
                    {
                        id: "sokcho-eye",
                        name: "속초아이 대관람차 & 영금정",
                        lat: 38.1930,
                        lng: 128.6045,
                        category: "바다/전망",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
                        desc: "푸른 바다 위를 도는 거대한 대관람차와 바위 위 정자에서 파도 소리를 듣는 힐링 명소입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "chuncheon",
        name: "강원특별자치도 춘천시",
        region: "강원권",
        lat: 37.8813,
        lng: 127.7298,
        sigungus: [
            {
                name: "남산면/도심",
                attractions: [
                    {
                        id: "chuncheon-nami",
                        name: "남이섬 & 춘천 닭갈비골목",
                        lat: 37.7915,
                        lng: 127.5255,
                        category: "자연/미식",
                        theme: "미식탐방",
                        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80",
                        desc: "메타세쿼이아 숲길이 환상적인 낭만 섬 남이섬과 매콤한 정통 춘천 닭갈비의 향연입니다."
                    }
                ]
            }
        ]
    },

    // ================= 충청권 =================
    {
        id: "daejeon",
        name: "대전광역시",
        region: "충청권",
        lat: 36.3504,
        lng: 127.3845,
        sigungus: [
            {
                name: "중구/유성구",
                attractions: [
                    {
                        id: "daejeon-sungsimdang",
                        name: "성심당 본점 & 엑스포 음악분수",
                        lat: 36.3277,
                        lng: 127.4273,
                        category: "향토미식/명소",
                        theme: "미식탐방",
                        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80",
                        desc: "전국 빵지순례 1번지 튀김소보로의 성심당과 야경이 아름다운 한빛탑 엑스포 광장입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "gongju",
        name: "충청남도 공주시",
        region: "충청권",
        lat: 36.4465,
        lng: 127.1190,
        sigungus: [
            {
                name: "금성동",
                attractions: [
                    {
                        id: "gongju-gongsanseong",
                        name: "백제 공산성 & 무령왕릉",
                        lat: 36.4630,
                        lng: 127.1265,
                        category: "역사문화",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
                        desc: "금강을 굽어보는 백제의 찬란한 숨결 공산성과 유네스코 세계유산 백제역사유적지구입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "danyang",
        name: "충청북도 단양군",
        region: "충청권",
        lat: 36.9845,
        lng: 128.3655,
        sigungus: [
            {
                name: "매포읍/단양읍",
                attractions: [
                    {
                        id: "danyang-dodam",
                        name: "단양 도담삼봉 & 만천하스카이워크",
                        lat: 36.9960,
                        lng: 128.3710,
                        category: "자연/전망",
                        theme: "자연힐링",
                        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
                        desc: "남한강 맑은 물 위에 솟은 세 봉우리 도담삼봉과 남한강을 한눈에 내려다보는 절벽 스카이워크입니다."
                    }
                ]
            }
        ]
    },

    // ================= 전라권 =================
    {
        id: "mokpo",
        name: "전라남도 목포시",
        region: "전라권",
        lat: 34.8119,
        lng: 126.3922,
        cityId: "mokpo",
        hasGuide: true,
        sigungus: [
            {
                name: "원도심/유달산권",
                attractions: [
                    {
                        id: "mokpo-history",
                        name: "목포근대역사관 1관",
                        lat: 34.7865,
                        lng: 126.3792,
                        category: "역사탐방",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
                        desc: "드라마 '호텔 델루나'의 촬영지이자 일제강점기 붉은 벽돌의 아픈 역사를 간직한 근대 문화유산입니다."
                    },
                    {
                        id: "mokpo-sihwa",
                        name: "서산동 시화골목 (연희네 슈퍼)",
                        lat: 34.7900,
                        lng: 126.3750,
                        category: "감성여행",
                        theme: "감성여행",
                        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
                        desc: "영화 '1987' 촬영지 연희네 슈퍼와 바다가 한눈에 내려다보이는 아기자기한 언덕 벽화 골목입니다."
                    },
                    {
                        id: "mokpo-yudal",
                        name: "유달산 노적봉 & 해상케이블카",
                        lat: 34.8010,
                        lng: 126.3720,
                        category: "자연/전망",
                        theme: "자연힐링",
                        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80",
                        desc: "목포의 영산 유달산 기암괴석과 다도해 바다 위를 가로지르는 국내 최장급 해상케이블카입니다."
                    }
                ]
            },
            {
                name: "미식/해안권",
                attractions: [
                    {
                        id: "mokpo-mineo",
                        name: "목포 민어거리 & 평화광장",
                        lat: 34.7870,
                        lng: 126.3820,
                        category: "남도미식",
                        theme: "미식탐방",
                        image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&q=80",
                        desc: "임금님 보양식 민어회, 꽃게살비빔밥 등 남도 9미의 정수와 야간 음악분수쇼가 열립니다."
                    },
                    {
                        id: "mokpo-gohado",
                        name: "고하도 해안데크 & 대반동 스카이워크",
                        lat: 34.7700,
                        lng: 126.3600,
                        category: "오션뷰힐링",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
                        desc: "기암절벽과 바다 위를 직접 걷는 해상 산책로 및 노을이 아름다운 대반동 오션뷰 카페 거리입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "gwangju",
        name: "광주광역시",
        region: "전라권",
        lat: 35.1595,
        lng: 126.8526,
        cityId: "gwangju",
        hasGuide: true,
        sigungus: [
            {
                name: "동구/북구",
                attractions: [
                    {
                        id: "gwangju-acc",
                        name: "국립아시아문화전당(ACC)",
                        lat: 35.1440,
                        lng: 126.9170,
                        category: "문화예술",
                        theme: "감성여행",
                        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
                        desc: "아시아 문화의 창조적 교류를 이끄는 초대형 도심 복합 문화 예술 건축 공간입니다."
                    },
                    {
                        id: "gwangju-mudeung",
                        name: "무등산국립공원 증심사지구",
                        lat: 35.1380,
                        lng: 126.9850,
                        category: "자연힐링",
                        theme: "자연힐링",
                        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
                        desc: "신비로운 주상절리 서석대와 입석대, 천년 고찰 증심사를 품은 광주의 어머니 산입니다."
                    }
                ]
            },
            {
                name: "광산구",
                attractions: [
                    {
                        id: "gwangju-songjeong",
                        name: "1913 송정역 시장 & 떡갈비골목",
                        lat: 35.1385,
                        lng: 126.7905,
                        category: "시장미식",
                        theme: "미식탐방",
                        image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80",
                        desc: "레트로 감성의 전통시장 청년몰과 육즙 가득한 광주 대표 송정 떡갈비를 맛보는 미식 코스입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "naju",
        name: "전라남도 나주시",
        region: "전라권",
        lat: 35.0158,
        lng: 126.7108,
        cityId: "naju",
        hasGuide: true,
        sigungus: [
            {
                name: "나주목 역사권",
                attractions: [
                    {
                        id: "naju-geumseong",
                        name: "나주 금성관 & 나주목 문화관",
                        lat: 35.0250,
                        lng: 126.7120,
                        category: "역사문화",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80",
                        desc: "조선시대 나주목의 웅장한 객사이자 호남의 중심 고을이었던 천년 나주의 역사를 간직한 유적입니다."
                    },
                    {
                        id: "naju-gomtang",
                        name: "나주곰탕 거리 (원조 하얀집)",
                        lat: 35.0240,
                        lng: 126.7110,
                        category: "향토미식",
                        theme: "미식탐방",
                        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
                        desc: "맑고 깊은 양지 사골 육수에 부드러운 고기가 듬뿍 들어간 대한민국 곰탕의 원조 거리입니다."
                    }
                ]
            },
            {
                name: "빛가람/영산강권",
                attractions: [
                    {
                        id: "naju-bitgaram",
                        name: "빛가람 호수공원 전망대 & 황포돛배",
                        lat: 35.0180,
                        lng: 126.7800,
                        category: "자연/전망",
                        theme: "자연힐링",
                        image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&q=80",
                        desc: "영산강 바람을 맞으며 타는 전통 황포돛배와 혁신도시의 아름다운 야경을 조망하는 모노레일 전망대입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "jeonju",
        name: "전북특별자치도 전주시",
        region: "전라권",
        lat: 35.8242,
        lng: 127.1480,
        sigungus: [
            {
                name: "완산구",
                attractions: [
                    {
                        id: "jeonju-hanok",
                        name: "전주 한옥마을 & 경기전",
                        lat: 35.8150,
                        lng: 127.1530,
                        category: "전통문화/한옥",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80",
                        desc: "700여 채의 한옥이 도심 속에 자리 잡은 슬로시티로 태조 어진이 모셔진 경기전과 전주비빔밥이 유명합니다."
                    }
                ]
            }
        ]
    },
    {
        id: "yeosu",
        name: "전라남도 여수시",
        region: "전라권",
        lat: 34.7604,
        lng: 127.6622,
        sigungus: [
            {
                name: "해양공원/돌산",
                attractions: [
                    {
                        id: "yeosu-odongdo",
                        name: "여수 오동도 & 해상케이블카",
                        lat: 34.7450,
                        lng: 127.7660,
                        category: "바다/야경",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
                        desc: "동백꽃 섬 오동도와 밤바다의 낭만을 하늘 위에서 감상하는 해상케이블카 및 낭만포차 거리입니다."
                    }
                ]
            }
        ]
    },

    // ================= 경상권 =================
    {
        id: "busan",
        name: "부산광역시",
        region: "경상권",
        lat: 35.1796,
        lng: 129.0756,
        sigungus: [
            {
                name: "해운대구",
                attractions: [
                    {
                        id: "busan-haeundae",
                        name: "해운대 해수욕장 & 블루라인파크",
                        lat: 35.1587,
                        lng: 129.1604,
                        category: "자연/바다",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
                        desc: "끝없이 펼쳐진 백사장과 바다 절경을 따라 달리는 해변열차 및 스카이캡슐을 즐길 수 있습니다."
                    }
                ]
            },
            {
                name: "사하구",
                attractions: [
                    {
                        id: "busan-gamcheon",
                        name: "감천문화마을",
                        lat: 35.0975,
                        lng: 129.0107,
                        category: "인생샷/예술",
                        theme: "감성여행",
                        image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&q=80",
                        desc: "알록달록 계단식 집들과 어린왕자 조형물이 반기는 한국의 마추픽추 감성 예술 마을입니다."
                    }
                ]
            }
        ]
    },
    {
        id: "gyeongju",
        name: "경상북도 경주시",
        region: "경상권",
        lat: 35.8562,
        lng: 129.2247,
        sigungus: [
            {
                name: "역사유적지구",
                attractions: [
                    {
                        id: "gyeongju-donggung",
                        name: "동궁과 월지 & 첨성대 야경",
                        lat: 35.8340,
                        lng: 129.2260,
                        category: "역사문화/야경",
                        theme: "역사문화",
                        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
                        desc: "물 위에 비치는 환상적인 신라 궁궐의 야경과 천년의 역사가 살아 숨 쉬는 첨성대 꽃단지입니다."
                    }
                ]
            }
        ]
    },

    // ================= 제주권 =================
    {
        id: "jeju",
        name: "제주특별자치도",
        region: "제주권",
        lat: 33.4996,
        lng: 126.5312,
        sigungus: [
            {
                name: "제주시",
                attractions: [
                    {
                        id: "jeju-hyeopjae",
                        name: "협재 해수욕장 & 금능해변",
                        lat: 33.3941,
                        lng: 126.2397,
                        category: "자연/바다",
                        theme: "힐링바다",
                        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
                        desc: "비양도를 마주보는 에메랄드빛 투명한 바다와 고운 은모래가 빛나는 제주 최고의 힐링 해변입니다."
                    }
                ]
            },
            {
                name: "서귀포시",
                attractions: [
                    {
                        id: "jeju-seongsan",
                        name: "성산일출봉 & 광치기해변",
                        lat: 33.4587,
                        lng: 126.9425,
                        category: "자연/일출",
                        theme: "자연힐링",
                        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
                        desc: "바다 한가운데 우뚝 솟은 거대한 화산 분화구 성산일출봉과 이끼 낀 용암 지대의 일출 비경입니다."
                    }
                ]
            }
        ]
    }
];
