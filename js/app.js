/**
 * KoreaTrip 플랫폼 메인 애플리케이션 스크립트 (app.js)
 *
 * 주요 기능:
 * 1. Leaflet 지도 및 MarkerCluster 클러스터링 초기화 (실제 OSM 기반 동작)
 * 2. 행정구역 계층 탐색기 (대한민국 -> 시도 -> 시군구 -> 읍면동 -> 마을)
 * 3. 통합 검색 및 실시간 자동완성 (시도, 시군구, 읍면동, 명소, 맛집 등)
 * 4. Airbnb 스타일 여행지 카드 렌더링 및 인터랙션
 * 5. 모바일 3단계 슬라이딩 바텀 시트 (Peek / Half / Full)
 * 6. 여행지 상세 모달 및 목포/광주/나주 기존 상세 가이드 연계
 */

(function () {
  'use strict';

  // 애플리케이션 상태 객체
  const state = {
    selectedSidoCode: null,
    selectedSigunguCode: null,
    selectedDongCode: null,
    selectedVillage: null,
    selectedCategory: '전체',
    searchKeyword: '',
    sidebarCollapsed: false,
    mobileSheetState: 'peek', // 'peek' | 'half' | 'full'
    activePlace: null
  };

  // 지도 관련 객체
  let map = null;
  let markerClusterGroup = null;
  const markerMap = new Map(); // place.id -> L.marker

  /**
   * 1. 지도 초기화 (Leaflet & MarkerCluster)
   */
  function initMap() {
    const mapElement = document.getElementById('map');
    if (!mapElement) return;

    const config = window.KOREATRIP_CONFIG || {
      defaultCenter: [36.2, 127.8],
      defaultZoom: 7,
      tileLayers: {
        osm: {
          url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
          options: { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }
        }
      }
    };

    // Leaflet 지도 인스턴스 생성
    map = L.map('map', {
      zoomControl: true,
      fadeAnimation: true
    }).setView(config.defaultCenter, config.defaultZoom);

    // 타일 레이어 추가 (OpenStreetMap 표준)
    const tileConf = config.tileLayers.osm;
    L.tileLayer(tileConf.url, tileConf.options).addTo(map);

    // 마커 클러스터 그룹 초기화
    if (typeof L.markerClusterGroup === 'function') {
      markerClusterGroup = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 50,
        spiderfyOnMaxZoom: true,
        iconCreateFunction: function (cluster) {
          const childCount = cluster.getChildCount();
          let c = ' marker-cluster-';
          if (childCount < 10) {
            c += 'small';
          } else if (childCount < 30) {
            c += 'medium';
          } else {
            c += 'large';
          }
          return new L.DivIcon({
            html: '<div><span>' + childCount + '</span></div>',
            className: 'marker-cluster' + c,
            iconSize: new L.Point(40, 40)
          });
        }
      });
      map.addLayer(markerClusterGroup);
    }

    // 지도 클릭 시 팝업 닫기 및 모바일 시트 축소
    map.on('click', () => {
      if (window.innerWidth <= 900 && state.mobileSheetState === 'full') {
        setMobileSheetState('peek');
      }
    });

    // 마커 렌더링 및 UI 갱신
    renderPlaces();
    renderSidebarHierarchy();
    setupEventListeners();
    setupSearchAutocomplete();

    // 창 크기 변경 대응
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 250);
  }

  /**
   * 2. 여행지 필터링 로직
   */
  function getFilteredPlaces() {
    const places = window.KOREA_PLACES_DATA || [];
    return places.filter(place => {
      // 1) 시도 필터
      if (state.selectedSidoCode && place.sidoCode !== state.selectedSidoCode) {
        return false;
      }
      // 2) 시군구 필터
      if (state.selectedSigunguCode && place.sigunguCode !== state.selectedSigunguCode) {
        return false;
      }
      // 3) 읍면동 필터
      if (state.selectedDongCode && place.dongCode !== state.selectedDongCode) {
        return false;
      }
      // 4) 마을 필터
      if (state.selectedVillage && place.village !== state.selectedVillage) {
        return false;
      }
      // 5) 카테고리 필터
      if (state.selectedCategory !== '전체' && place.category !== state.selectedCategory) {
        return false;
      }
      // 6) 검색어 필터
      if (state.searchKeyword) {
        const kw = state.searchKeyword.toLowerCase();
        const matchName = place.name.toLowerCase().includes(kw);
        const matchDesc = place.desc.toLowerCase().includes(kw);
        const matchCategory = place.category.toLowerCase().includes(kw);
        const matchAddr = place.regionName.toLowerCase().includes(kw);
        const matchVillage = place.village ? place.village.toLowerCase().includes(kw) : false;
        if (!matchName && !matchDesc && !matchCategory && !matchAddr && !matchVillage) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * 3. 지도 마커 및 클러스터 렌더링
   */
  function renderPlaces() {
    const filteredPlaces = getFilteredPlaces();

    // 기존 마커 제거
    if (markerClusterGroup) {
      markerClusterGroup.clearLayers();
    }
    markerMap.clear();

    filteredPlaces.forEach(place => {
      // 카테고리별 아이콘 결정
      let iconClass = 'fa-location-dot';
      if (place.category.includes('역사')) iconClass = 'fa-landmark';
      else if (place.category.includes('자연') || place.category.includes('힐링')) iconClass = 'fa-tree';
      else if (place.category.includes('미식') || place.category.includes('시장')) iconClass = 'fa-utensils';
      else if (place.category.includes('바다') || place.category.includes('오션')) iconClass = 'fa-water';
      else if (place.category.includes('예술') || place.category.includes('감성')) iconClass = 'fa-palette';

      const customIcon = L.divIcon({
        className: 'custom-korea-marker',
        html: `<i class="fa-solid ${iconClass}"></i>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -18]
      });

      const marker = L.marker([place.lat, place.lng], { icon: customIcon });

      // Airbnb 스타일 팝업 마크업
      const popupHtml = `
        <div class="popup-airbnb-card">
          <img src="${place.image}" alt="${place.name}" onerror="this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'">
          <div class="popup-card-content">
            <span class="popup-card-badge">${place.category}</span>
            <h4 class="popup-card-title">${place.name}</h4>
            <div class="popup-card-location"><i class="fa-solid fa-map-pin"></i> ${place.regionName}</div>
            <button class="popup-card-btn" onclick="window.koreaTripApp.openPlaceDetail('${place.id}')">상세 보기</button>
          </div>
        </div>
      `;

      marker.bindPopup(popupHtml);

      // 마커 클릭 인터랙션
      marker.on('click', () => {
        highlightPlaceCard(place.id);
        if (window.innerWidth <= 900) {
          setMobileSheetState('half');
        }
      });

      if (markerClusterGroup) {
        markerClusterGroup.addLayer(marker);
      } else {
        marker.addTo(map);
      }

      markerMap.set(place.id, marker);
    });

    // 사이드바 목록 갱신
    renderSidebarPlaceList(filteredPlaces);
  }

  /**
   * 4. 사이드바 여행지 카드 목록 렌더링 (Airbnb 스타일)
   */
  function renderSidebarPlaceList(places) {
    const listContainer = document.getElementById('sidebarPlacesList');
    const countBadge = document.getElementById('placesCountBadge');
    if (!listContainer) return;

    if (countBadge) {
      countBadge.textContent = `${places.length}곳`;
    }

    if (places.length === 0) {
      listContainer.innerHTML = `
        <div class="places-empty-state">
          <i class="fa-solid fa-compass"></i>
          <h3>선택한 조건의 여행지가 없습니다</h3>
          <p>지역 필터를 변경하거나 상단 검색어로 탐색해보세요.</p>
        </div>
      `;
      return;
    }

    listContainer.innerHTML = '';

    places.forEach(place => {
      const card = document.createElement('article');
      card.className = 'place-card';
      card.id = `card-${place.id}`;

      const tagsHtml = (place.tags || []).slice(0, 3)
        .map(t => `<span class="place-tag">${t}</span>`).join('');

      card.innerHTML = `
        <div class="place-card-img-wrap">
          <img src="${place.image}" alt="${place.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80'">
          <span class="place-badge-category">${place.category}</span>
          ${place.hasFullGuide ? `<span class="place-badge-guide"><i class="fa-solid fa-book-open"></i> 완벽 가이드</span>` : ''}
        </div>
        <div class="place-card-body">
          <div class="place-card-header">
            <h3 class="place-card-name">${place.name}</h3>
            <span class="place-card-rating"><i class="fa-solid fa-star"></i> ${place.rating || '4.8'}</span>
          </div>
          <div class="place-card-location">
            <i class="fa-solid fa-location-dot"></i> ${place.regionName}
          </div>
          <p class="place-card-desc">${place.desc}</p>
          <div class="place-card-footer">
            <div class="place-card-tags">${tagsHtml}</div>
            <button class="btn-card-detail" onclick="event.stopPropagation(); window.koreaTripApp.openPlaceDetail('${place.id}')">상세보기</button>
          </div>
        </div>
      `;

      // 카드 클릭 시 지도로 포커스 이동 & 팝업 열기
      card.addEventListener('click', () => {
        focusPlaceOnMap(place.id);
      });

      listContainer.appendChild(card);
    });
  }

  /**
   * 5. 지도에서 여행지 포커스 이동
   */
  function focusPlaceOnMap(placeId) {
    const place = (window.KOREA_PLACES_DATA || []).find(p => p.id === placeId);
    if (!place || !map) return;

    highlightPlaceCard(placeId);

    map.flyTo([place.lat, place.lng], 14, {
      animate: true,
      duration: 0.8
    });

    const marker = markerMap.get(placeId);
    if (marker) {
      setTimeout(() => {
        if (markerClusterGroup && markerClusterGroup.hasLayer(marker)) {
          markerClusterGroup.zoomToShowLayer(marker, () => {
            marker.openPopup();
          });
        } else {
          marker.openPopup();
        }
      }, 400);
    }
  }

  function highlightPlaceCard(placeId) {
    document.querySelectorAll('.place-card').forEach(c => c.classList.remove('highlighted'));
    const targetCard = document.getElementById(`card-${placeId}`);
    if (targetCard) {
      targetCard.classList.add('highlighted');
      targetCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  /**
   * 6. 사이드바 계층 탐색기 렌더링 (시도 -> 시군구 -> 읍면동)
   */
  function renderSidebarHierarchy() {
    const regions = window.KOREA_REGIONS_DATA || [];
    const allPlaces = window.KOREA_PLACES_DATA || [];

    // 1) 브레드크럼 렌더링
    renderBreadcrumb();

    // 2) 시도 필터 칩 렌더링
    const sidoContainer = document.getElementById('sidoChipsContainer');
    if (sidoContainer) {
      let sidoHtml = `
        <button class="filter-chip ${state.selectedSidoCode === null ? 'active' : ''}" onclick="window.koreaTripApp.selectSido(null)">
          전국 <span class="chip-count">${allPlaces.length}</span>
        </button>
      `;

      regions.forEach(sido => {
        const count = allPlaces.filter(p => p.sidoCode === sido.code).length;
        const isActive = state.selectedSidoCode === sido.code;
        sidoHtml += `
          <button class="filter-chip ${isActive ? 'active' : ''}" onclick="window.koreaTripApp.selectSido('${sido.code}')">
            ${sido.shortName || sido.name} <span class="chip-count">${count}</span>
          </button>
        `;
      });
      sidoContainer.innerHTML = sidoHtml;
    }

    // 3) 시군구 필터 칩 렌더링 (선택된 시도가 있을 때만)
    const sigunguRow = document.getElementById('sigunguFilterRow');
    const sigunguContainer = document.getElementById('sigunguChipsContainer');
    if (sigunguRow && sigunguContainer) {
      if (!state.selectedSidoCode) {
        sigunguRow.style.display = 'none';
      } else {
        sigunguRow.style.display = 'block';
        const currentSido = regions.find(r => r.code === state.selectedSidoCode);
        const sigungus = currentSido ? currentSido.sigungus : [];

        let sigunguHtml = `
          <button class="filter-chip ${state.selectedSigunguCode === null ? 'active' : ''}" onclick="window.koreaTripApp.selectSigungu(null)">
            전체
          </button>
        `;

        sigungus.forEach(sig => {
          const count = allPlaces.filter(p => p.sigunguCode === sig.code).length;
          const isActive = state.selectedSigunguCode === sig.code;
          sigunguHtml += `
            <button class="filter-chip ${isActive ? 'active' : ''}" onclick="window.koreaTripApp.selectSigungu('${sig.code}')">
              ${sig.name} ${count > 0 ? `<span class="chip-count">${count}</span>` : ''}
            </button>
          `;
        });
        sigunguContainer.innerHTML = sigunguHtml;
      }
    }

    // 4) 읍면동 필터 칩 렌더링 (선택된 시군구가 있을 때만)
    const dongRow = document.getElementById('dongFilterRow');
    const dongContainer = document.getElementById('dongChipsContainer');
    if (dongRow && dongContainer) {
      if (!state.selectedSigunguCode) {
        dongRow.style.display = 'none';
      } else {
        const currentSido = regions.find(r => r.code === state.selectedSidoCode);
        const currentSigungu = currentSido ? currentSido.sigungus.find(s => s.code === state.selectedSigunguCode) : null;
        const dongTowns = currentSigungu && currentSigungu.dongTowns ? currentSigungu.dongTowns : [];

        if (dongTowns.length > 0) {
          dongRow.style.display = 'block';
          let dongHtml = `
            <button class="filter-chip ${state.selectedDongCode === null ? 'active' : ''}" onclick="window.koreaTripApp.selectDong(null)">
              전체
            </button>
          `;

          dongTowns.forEach(dong => {
            const count = allPlaces.filter(p => p.dongCode === dong.code).length;
            const isActive = state.selectedDongCode === dong.code;
            dongHtml += `
              <button class="filter-chip ${isActive ? 'active' : ''}" onclick="window.koreaTripApp.selectDong('${dong.code}')">
                ${dong.name} ${count > 0 ? `<span class="chip-count">${count}</span>` : ''}
              </button>
            `;
          });
          dongContainer.innerHTML = dongHtml;
        } else {
          dongRow.style.display = 'none';
        }
      }
    }
  }

  /**
   * 7. 브레드크럼 렌더링
   */
  function renderBreadcrumb() {
    const breadcrumbEl = document.getElementById('breadcrumbNav');
    if (!breadcrumbEl) return;

    const regions = window.KOREA_REGIONS_DATA || [];
    let html = `<span class="breadcrumb-item ${!state.selectedSidoCode ? 'current' : ''}" onclick="window.koreaTripApp.resetToCountry()">대한민국</span>`;

    if (state.selectedSidoCode) {
      const sido = regions.find(r => r.code === state.selectedSidoCode);
      if (sido) {
        html += `<span class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></span>`;
        html += `<span class="breadcrumb-item ${!state.selectedSigunguCode ? 'current' : ''}" onclick="window.koreaTripApp.selectSido('${sido.code}')">${sido.name}</span>`;

        if (state.selectedSigunguCode) {
          const sig = sido.sigungus.find(s => s.code === state.selectedSigunguCode);
          if (sig) {
            html += `<span class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></span>`;
            html += `<span class="breadcrumb-item ${!state.selectedDongCode ? 'current' : ''}" onclick="window.koreaTripApp.selectSigungu('${sig.code}')">${sig.name}</span>`;

            if (state.selectedDongCode && sig.dongTowns) {
              const dong = sig.dongTowns.find(d => d.code === state.selectedDongCode);
              if (dong) {
                html += `<span class="breadcrumb-separator"><i class="fa-solid fa-chevron-right"></i></span>`;
                html += `<span class="breadcrumb-item current">${dong.name}</span>`;
              }
            }
          }
        }
      }
    }

    breadcrumbEl.innerHTML = html;
  }

  /**
   * 8. 계층 선택 액션
   */
  function selectSido(sidoCode) {
    state.selectedSidoCode = sidoCode;
    state.selectedSigunguCode = null;
    state.selectedDongCode = null;
    state.selectedVillage = null;

    if (sidoCode && map) {
      const regions = window.KOREA_REGIONS_DATA || [];
      const sido = regions.find(r => r.code === sidoCode);
      if (sido) {
        map.flyTo([sido.lat, sido.lng], sido.zoom || 10, { animate: true });
      }
    } else if (map) {
      map.flyTo([36.2, 127.8], 7, { animate: true });
    }

    renderSidebarHierarchy();
    renderPlaces();
  }

  function selectSigungu(sigunguCode) {
    state.selectedSigunguCode = sigunguCode;
    state.selectedDongCode = null;
    state.selectedVillage = null;

    if (sigunguCode && map) {
      const regions = window.KOREA_REGIONS_DATA || [];
      const sido = regions.find(r => r.code === state.selectedSidoCode);
      if (sido) {
        const sig = sido.sigungus.find(s => s.code === sigunguCode);
        if (sig) {
          map.flyTo([sig.lat, sig.lng], sig.zoom || 13, { animate: true });
        }
      }
    }

    renderSidebarHierarchy();
    renderPlaces();
  }

  function selectDong(dongCode) {
    state.selectedDongCode = dongCode;
    state.selectedVillage = null;

    if (dongCode && map) {
      const regions = window.KOREA_REGIONS_DATA || [];
      const sido = regions.find(r => r.code === state.selectedSidoCode);
      if (sido) {
        const sig = sido.sigungus.find(s => s.code === state.selectedSigunguCode);
        if (sig && sig.dongTowns) {
          const dong = sig.dongTowns.find(d => d.code === dongCode);
          if (dong) {
            map.flyTo([dong.lat, dong.lng], dong.zoom || 14, { animate: true });
          }
        }
      }
    }

    renderSidebarHierarchy();
    renderPlaces();
  }

  function resetToCountry() {
    selectSido(null);
  }

  function setCategory(category) {
    state.selectedCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => {
      if (btn.dataset.category === category) btn.classList.add('active');
      else btn.classList.remove('active');
    });
    renderPlaces();
  }

  /**
   * 9. 통합 검색 & 실시간 자동완성
   */
  function setupSearchAutocomplete() {
    const input = document.getElementById('mapSearchInput');
    const dropdown = document.getElementById('searchAutocompleteBox');
    const clearBtn = document.getElementById('btnClearSearch');
    if (!input || !dropdown) return;

    input.addEventListener('input', (e) => {
      const val = e.target.value.trim();
      state.searchKeyword = val;
      if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';

      if (!val) {
        dropdown.classList.remove('active');
        renderPlaces();
        return;
      }

      const kw = val.toLowerCase();
      const regions = window.KOREA_REGIONS_DATA || [];
      const places = window.KOREA_PLACES_DATA || [];

      // 매칭되는 지역 수집 (시도, 시군구, 읍면동, 마을)
      const matchedRegions = [];
      regions.forEach(sido => {
        if (sido.name.toLowerCase().includes(kw) || sido.shortName.toLowerCase().includes(kw)) {
          matchedRegions.push({ type: 'sido', data: sido, name: sido.name, sub: '대한민국 시도' });
        }
        sido.sigungus.forEach(sig => {
          if (sig.name.toLowerCase().includes(kw)) {
            matchedRegions.push({ type: 'sigungu', sido, data: sig, name: `${sido.shortName} ${sig.name}`, sub: '시군구' });
          }
          if (sig.dongTowns) {
            sig.dongTowns.forEach(dong => {
              if (dong.name.toLowerCase().includes(kw)) {
                matchedRegions.push({ type: 'dong', sido, sig, data: dong, name: `${sig.name} ${dong.name}`, sub: '읍면동' });
              }
              if (dong.villages) {
                dong.villages.forEach(v => {
                  if (v.toLowerCase().includes(kw)) {
                    matchedRegions.push({ type: 'village', sido, sig, dong, name: `${dong.name} ${v}`, sub: '마을/세부지역' });
                  }
                });
              }
            });
          }
        });
      });

      // 매칭되는 여행지 수집
      const matchedPlaces = places.filter(p =>
        p.name.toLowerCase().includes(kw) ||
        p.category.toLowerCase().includes(kw) ||
        p.desc.toLowerCase().includes(kw) ||
        p.regionName.toLowerCase().includes(kw)
      );

      if (matchedRegions.length === 0 && matchedPlaces.length === 0) {
        dropdown.innerHTML = `<div class="ac-item"><span class="ac-item-name">"${val}"에 대한 검색 결과가 없습니다.</span></div>`;
        dropdown.classList.add('active');
        return;
      }

      let dropdownHtml = '';

      if (matchedRegions.length > 0) {
        dropdownHtml += `<div class="ac-group-title">지역 및 행정구역</div>`;
        matchedRegions.slice(0, 4).forEach(item => {
          dropdownHtml += `
            <div class="ac-item" data-action="region" data-type="${item.type}">
              <div class="ac-item-content">
                <span class="ac-item-name">${item.name}</span>
                <span class="ac-item-sub">${item.sub}</span>
              </div>
              <span class="ac-item-badge region"><i class="fa-solid fa-map-location-dot"></i> 지역</span>
            </div>
          `;
        });
      }

      if (matchedPlaces.length > 0) {
        dropdownHtml += `<div class="ac-group-title">여행지 및 명소</div>`;
        matchedPlaces.slice(0, 5).forEach(p => {
          dropdownHtml += `
            <div class="ac-item" data-action="place" data-place-id="${p.id}">
              <div class="ac-item-content">
                <span class="ac-item-name">${p.name}</span>
                <span class="ac-item-sub">${p.regionName} · ${p.category}</span>
              </div>
              <span class="ac-item-badge place"><i class="fa-solid fa-compass"></i> 명소</span>
            </div>
          `;
        });
      }

      dropdown.innerHTML = dropdownHtml;
      dropdown.classList.add('active');

      // 자동완성 아이템 클릭 이벤트
      dropdown.querySelectorAll('.ac-item').forEach(itemEl => {
        itemEl.addEventListener('click', () => {
          const action = itemEl.dataset.action;
          if (action === 'place') {
            const placeId = itemEl.dataset.placeId;
            dropdown.classList.remove('active');
            focusPlaceOnMap(placeId);
          } else if (action === 'region') {
            dropdown.classList.remove('active');
            const type = itemEl.dataset.type;
            const regionItem = matchedRegions.find(r => r.type === type);
            if (regionItem) {
              if (type === 'sido') selectSido(regionItem.data.code);
              else if (type === 'sigungu') {
                state.selectedSidoCode = regionItem.sido.code;
                selectSigungu(regionItem.data.code);
              } else if (type === 'dong') {
                state.selectedSidoCode = regionItem.sido.code;
                state.selectedSigunguCode = regionItem.sig.code;
                selectDong(regionItem.data.code);
              }
            }
          }
        });
      });

      renderPlaces();
    });

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        input.value = '';
        state.searchKeyword = '';
        clearBtn.style.display = 'none';
        dropdown.classList.remove('active');
        renderPlaces();
      });
    }

    document.addEventListener('click', (e) => {
      if (!input.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });
  }

  /**
   * 10. 여행지 상세 모달 (Airbnb 스타일)
   */
  function openPlaceDetail(placeId) {
    const place = (window.KOREA_PLACES_DATA || []).find(p => p.id === placeId);
    if (!place) return;

    state.activePlace = place;
    const modalOverlay = document.getElementById('placeDetailModalOverlay');
    if (!modalOverlay) return;

    document.getElementById('modalHeroImg').src = place.image;
    document.getElementById('modalHeroImg').alt = place.name;
    document.getElementById('modalCategoryBadge').textContent = place.category;
    document.getElementById('modalTitle').textContent = place.name;
    document.getElementById('modalAddress').innerHTML = `<i class="fa-solid fa-location-dot"></i> ${place.address || place.regionName}`;
    document.getElementById('modalDesc').textContent = place.desc;

    const tagsContainer = document.getElementById('modalTagsContainer');
    if (tagsContainer) {
      tagsContainer.innerHTML = (place.tags || []).map(t => `<span class="place-tag">${t}</span>`).join('');
    }

    // 완벽 가이드 버튼 제어
    const guideBtn = document.getElementById('btnModalGuide');
    if (guideBtn) {
      if (place.hasFullGuide && place.guideId) {
        guideBtn.style.display = 'inline-flex';
        guideBtn.onclick = () => {
          closePlaceDetail();
          switchCity(place.guideId);
        };
      } else {
        guideBtn.style.display = 'none';
      }
    }

    // 지도 포커스 버튼 제어
    const focusBtn = document.getElementById('btnModalFocus');
    if (focusBtn) {
      focusBtn.onclick = () => {
        closePlaceDetail();
        focusPlaceOnMap(place.id);
      };
    }

    modalOverlay.classList.add('active');
  }

  function closePlaceDetail() {
    const modalOverlay = document.getElementById('placeDetailModalOverlay');
    if (modalOverlay) {
      modalOverlay.classList.remove('active');
    }
  }

  /**
   * 11. 모바일 바텀 시트 상태 제어
   */
  function setMobileSheetState(sheetState) {
    state.mobileSheetState = sheetState;
    const sidebar = document.getElementById('mapSidebar');
    if (!sidebar) return;

    sidebar.classList.remove('sheet-peek', 'sheet-half', 'sheet-full');
    sidebar.classList.add(`sheet-${sheetState}`);
  }

  function toggleMobileSheet() {
    if (state.mobileSheetState === 'peek') {
      setMobileSheetState('half');
    } else if (state.mobileSheetState === 'half') {
      setMobileSheetState('full');
    } else {
      setMobileSheetState('peek');
    }
  }

  /**
   * 12. PC 사이드바 접기/펼치기
   */
  function toggleSidebar() {
    const viewport = document.getElementById('mapAppViewport');
    const toggleIcon = document.getElementById('sidebarToggleIcon');
    if (!viewport) return;

    state.sidebarCollapsed = !state.sidebarCollapsed;
    viewport.classList.toggle('sidebar-collapsed', state.sidebarCollapsed);

    if (toggleIcon) {
      toggleIcon.className = state.sidebarCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left';
    }

    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 300);
  }

  /**
   * 13. 이벤트 리스너 등록
   */
  function setupEventListeners() {
    // 사이드바 접기 버튼
    const toggleBtn = document.getElementById('btnSidebarToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', toggleSidebar);
    }

    // 모바일 바텀시트 헤더/핸들 클릭
    const sheetHandle = document.getElementById('bottomSheetHandle');
    const sidebarHeader = document.getElementById('sidebarHeader');
    if (sheetHandle) {
      sheetHandle.addEventListener('click', toggleMobileSheet);
    }
    if (sidebarHeader && window.innerWidth <= 900) {
      sidebarHeader.addEventListener('click', (e) => {
        if (!e.target.closest('.breadcrumb-item')) {
          toggleMobileSheet();
        }
      });
    }

    // 모달 닫기
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalOverlay = document.getElementById('placeDetailModalOverlay');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closePlaceDetail);
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closePlaceDetail();
      });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closePlaceDetail();
        const imgModal = document.getElementById('imageModal');
        if (imgModal) imgModal.style.display = 'none';
      }
    });

    // 전역 카테고리 버튼
    document.querySelectorAll('.category-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setCategory(btn.dataset.category);
      });
    });
  }

  /**
   * 14. 기존 목포, 광주, 나주 상세 가이드 뷰 연동 (보존 및 통합)
   */
  window.showHomeMap = function () {
    document.querySelectorAll('.city-detail-view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-home-map').classList.add('active');
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    const homeLink = document.querySelector('.nav-link[data-nav="map"]');
    if (homeLink) homeLink.classList.add('active');

    if (map) {
      setTimeout(() => map.invalidateSize(), 200);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.switchCity = function (cityName) {
    document.querySelectorAll('.city-detail-view').forEach(v => v.classList.remove('active'));
    document.getElementById('view-home-map').classList.remove('active');
    const target = document.getElementById('city-' + cityName);
    if (target) {
      target.classList.add('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  window.switchPlan = function (city, planId) {
    const container = document.getElementById('city-' + city);
    if (!container) return;
    container.querySelectorAll('.course-card').forEach(c => c.classList.remove('active'));
    container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    const targetCard = document.getElementById(city + '-plan-' + planId);
    if (targetCard) targetCard.classList.add('active');
    const btns = container.querySelectorAll('.tab-btn');
    btns.forEach(btn => {
      if (btn.innerText.includes('Plan ' + planId) || btn.innerText.includes(planId)) {
        btn.classList.add('active');
      }
    });
  };

  window.showThemeTravel = function () {
    showToast('테마 여행(미식로드, 야경명소 등) 큐레이션 서비스 준비 중입니다.');
  };

  window.showTravelInfo = function () {
    showToast('대한민국 전국 지도 기반 여행 정보 플랫폼 KoreaTrip입니다.');
  };

  window.showToast = function (message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerText = message;
    toast.classList.add('show');
    setTimeout(() => { toast.classList.remove('show'); }, 3000);
  };

  // 전역 API 노출
  window.koreaTripApp = {
    selectSido,
    selectSigungu,
    selectDong,
    resetToCountry,
    setCategory,
    focusPlaceOnMap,
    openPlaceDetail,
    closePlaceDetail,
    toggleSidebar,
    toggleMobileSheet
  };

  // 윈도우 로드 시 초기화
  window.addEventListener('load', () => {
    initMap();
  });

})();
