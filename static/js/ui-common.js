$(function () {
  commonUI();
  mainUI();
  mainTitle();
});
$(window).on('resize', function () {
  vhChk();
});

vhChk();
function vhChk() {
  const $vh = window.innerHeight * 0.01;
  $('html').css('--vh', $vh + 'px');
}
function mainTitle() {
  $('.txt_wrap h2').css({ opacity: 0, visibility: 'visible' }).animate({ opacity: 1 }, 1500);
  $('.txt_wrap p').css({ width: 0 }).animate({ width: '100%' }, 400);
}
function commonUI() {
  // gnb 메뉴

  const btnMenu = document.querySelector('.btn-menu');
  const $gnbMenu = $('.commonGnb > ol');
  const $gnbMenuClone = $gnbMenu.clone();
  $('.f-menu-list').html($gnbMenuClone);

  let $gnbTxt = $('.commonGnb li a');
  const $title = $.trim($('#pageTit').text());
  $gnbTxt.each(function () {
    if ($(this).text() === $title) {
      const $parents = $(this).parents('li');
      $parents.addClass('active');
    }
  });

  function menuPop() {
    const body = $('body');
    const openBtn = $('.header .btn-menu');

    let prevSclTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
    document.addEventListener('scroll', function () {
      const nowSclTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      const sclDirection = nowSclTop > prevSclTop ? 'down' : 'up';
      const sclDistance = Math.abs(nowSclTop - prevSclTop);
      const elArray = [];
      const header = document.querySelector('.header');
      if (header) elArray.push(header);
      const tagSwiper = document.querySelector('.tag-menu');
      if (tagSwiper) elArray.push(tagSwiper);

      if (elArray.length) fixedClassChk(elArray, nowSclTop, sclDirection, sclDistance);

      prevSclTop = nowSclTop;
    });

    // GNB 메뉴
    btnMenu.addEventListener('click', function (e) {
      e.stopPropagation();
      document.body.classList.toggle('gnbPopup');
    });

    document.addEventListener('click', function (e) {
      const target = e.target;
      if (!target.matches('.btn-menu') && !target.matches('.gnbPopup') && !target.matches('.commonGnb')) {
        document.body.classList.remove('gnbPopup');
      }
    });
  }

  // 스크롤 top 버튼
  function scrollTop() {
    let scrollArea;
    const scrollBtn = $('.scroll-top');
    const popScrollBtn = $('.pop-full .scroll-top');
    const wrapper = document.querySelector('#container');
    const btn = scrollBtn.children();

    scrollBtn.hide();
    popScrollBtn.hide();

    if ($('#wrapper').hasClass('main')) {
      scrollArea = $('.contents-group-box .inner');
    } else {
      scrollArea = $(window);
    }

    scrollArea.scroll(function () {
      if ($(this).scrollTop() > 100) {
        scrollBtn.fadeIn();
      } else if (scrollArea.scrollTop() <= 0) {
        // 스크롤 0 일때 닫기
        mainTitle();
        setTimeout(function () {
          wrapper.classList.remove('active');
        }, 100);
      } else {
        scrollBtn.fadeOut();
      }
    });

    btn.on('click', function () {
      if ($('#wrapper').hasClass('main')) {
        scrollArea.animate({ scrollTop: 0 }, 800, function () {
          $(this).closest('#container').removeClass('active');
        });
      } else if ($('#wrapper').hasClass('popOpen')) {
        $('.pop-full').animate({ scrollTop: 0 }, 500);
      } else {
        $('html, body').animate({ scrollTop: 0 }, 500);
      }
    });
  }
  // detail 팝업 열기
  function commonDetailPop() {
    document.querySelectorAll('.detail-open').forEach((item) => {
      item.addEventListener('click', function (event) {
        event.preventDefault(); // 기본 이벤트 동작 방지 (페이지 이동)
        document.body.style.overflow = 'hidden'; // body에 스크롤 풀기(이중 스크롤 방지)
        const href = this.getAttribute('href'); // 클릭된 링크의 href 속성값 가져오기
        const detailCont = document.querySelector('.pop-full .detail-cont'); // .detail-cont 요소를 변수에 담기

        $('.pop-detail').append('<div class="scroll-top"><button type="button" class="btn-scroll-top" aria-label="팝업 상단으로 이동"></button></div>');
        const popScrlTop = $('.pop-detail .scroll-top');
        popScrlTop.hide();
        $('.pop-detail').scroll(function () {
          if ($(this).scrollTop() > 100) {
            popScrlTop.fadeIn();
          } else {
            popScrlTop.fadeOut();
          }
        });
        popScrlTop.on('click', function () {
          $('.pop-full').animate({ scrollTop: 0 }, 500);
        });

        // AJAX 요청 보내기
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4 && xhr.status === 200) {
            detailCont.innerHTML = ''; // 컨텐츠 한번 지우고
            // 응답을 detailCont 변수에 담긴 요소에 넣기
            detailCont.innerHTML = xhr.responseText;
            // "wrapper" ID를 가진 div에 "popOpen" 클래스 추가
            document.getElementById('wrapper').classList.add('popOpen');
            // detailCont의 scrollTop을 0으로 설정
            document.querySelector('.pop-full').scrollTop = 0;
          }
        };
        xhr.open('GET', href, true);
        xhr.send();
      });
    });
    // detail 팝업 닫기
    document.querySelectorAll('.detail-close').forEach((item) => {
      item.addEventListener('click', function (event) {
        event.preventDefault(); // 기본 이벤트 동작 방지 (페이지 이동)
        document.body.style.overflow = ''; // body에 스크롤 풀기
        document.querySelector('.pop-full .detail-cont').innerHTML = '';
        document.getElementById('wrapper').classList.remove('popOpen');
        $('.pop-detail .scroll-top').remove();
      });
    });
  }

  // 스크롤 이벤트
  const aniElements = document.querySelectorAll('[data-animation]');
  aniElements.forEach(function (element) {
    element.classList.add('ani-ready');
  });

  // const test1 = document.querySelector('.pop-full');
  // test1.addEventListener('scroll', function () {
  //   const elements = document.querySelectorAll('[data-animation]');

  //   elements.forEach(function (element) {
  //     let position = element.getBoundingClientRect();
  //     let screenMiddle = window.innerHeight / 2;
  //     let animationClass = element.getAttribute('data-animation');
  //     // element.classList.add('animated');

  //     if (position.top + position.height / 3 < screenMiddle) {
  //       element.classList.remove('ani-ready');
  //       element.classList.add('animate__animated');

  //       element.classList.add(animationClass);
  //     }
  //   });
  // });

  menuPop();
  scrollTop();
  // commonDetailPop();
}

// 상세 팝업 내 다음 페이지
function nextLoad(event) {
  event.preventDefault();

  const link = event.target.getAttribute('href');
  const detailCont = document.querySelector('.pop-full .detail-cont');

  let xhr = new XMLHttpRequest();
  xhr.open('GET', link, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      detailCont.innerHTML = ''; // 컨텐츠 한번 지우고
      detailCont.innerHTML = xhr.responseText;
      document.querySelector('.pop-full').scrollTop = 0;
    }
  };

  xhr.send();
}

// 스크롤 시 header와 work 페이지 tag swiper 고정 스크립트
function fixedClassChk(elArray, nowSclTop, sclDirection, sclDistance) {
  elArray.forEach(function (item) {
    const itemEnd = getOffset(item).top + item.offsetHeight;
    if (nowSclTop > itemEnd) {
      item.classList.add('fixed');
      if (sclDistance > 5) {
        if (sclDirection === 'down') {
          item.classList.add('is-up');
        } else {
          item.classList.remove('is-up');
        }
      }
    } else {
      item.classList.remove('fixed', 'is-up');
    }
  });
}

// 메인
let $mainBanner;
let $mainWork;
function mainUI() {
  if (!$('#wrapper').hasClass('main')) return;
  const wrapper = document.querySelector('#container');
  const dragElement = document.querySelector('.main-slide-wrap');
  const cateList = document.querySelector('.contents-box');
  const scrollArea = $('.contents-group-box .inner');
  const $swiperControl = $('.main-swiper .swiper-control');

  const btnMenu = document.querySelector('.contents-group-box .btn-open-career');
  let isDragging = false;
  let initialX;
  let initialY;

  // 메인 배너 스와이퍼
  $mainBanner = new Swiper('.main-swiper', {
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false
    },
    preventInteractionOnTransition: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  });

  $swiperControl.on('click touchstart', function () {
    const $this = $(this);
    $this.toggleClass('pause');
    if (!$swiperControl.hasClass('pause')) {
      $mainBanner.autoplay.start();
      $this.text('자동 재생 시작');
    } else {
      $mainBanner.autoplay.stop();
      $this.text('자동 재생 멈춤');
    }
  });

  // 메인 work 스와이퍼
  $mainWork = new Swiper('.small-swiper', {
    slidesPerView: 'auto'
  });

  // 메인 휠 스크롤,터치 무브 이벤트
  wrapper.addEventListener('mousedown', handleMouseDown);
  dragElement.addEventListener('touchstart', handleTouchStart, { passive: false });
  dragElement.addEventListener('wheel', handleWheel, { passive: true });

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('touchmove', handleTouchMove);

  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchend', handleTouchEnd);

  btnMenu.addEventListener('click', menuToggle);
  //btnMenu.addEventListener('touchend', menuToggle);

  function menuToggle() {
    if (wrapper.classList.contains('active')) {
      wrapper.classList.remove('active');
    } else {
      wrapper.classList.add('active');
    }
  }

  function handleWheel(e) {
    const direction = e.deltaY > 0 ? 'down' : 'up';
    wrapper.classList.toggle('active', direction === 'down');
    scrollArea.scrollTop(1);
  }

  function handleMouseDown(e) {
    // 마우스 왼쪽 버튼(버튼 코드: 0)에 대한 클릭만 처리
    if (e.button === 0) {
      e.preventDefault();
      isDragging = true;
      initialX = e.clientX;
      initialY = e.clientY;
    }
  }

  function handleTouchStart(e) {
    if (e.cancelable) {
      e.preventDefault();
    }

    if (!isDragging) {
      isDragging = true;
      initialX = e.touches[0].clientX;
      initialY = e.touches[0].clientY;

      const customEvent = new CustomEvent('touchstartcustom', {
        detail: { initialX, initialY }
      });
      document.dispatchEvent(customEvent);
    }
  }

  function handleDrag(e) {
    if (isDragging) {
      let currentX = e.clientX;
      let currentY = e.clientY;
      handleDragMovement(currentX, currentY);
    }
  }

  function handleTouchMove(e) {
    if (isDragging) {
      let currentX = e.touches[0].clientX;
      let currentY = e.touches[0].clientY;
      handleDragMovement(currentX, currentY);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleDragMovement(currentX, currentY) {
    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;

    if (isInsideCateList(currentX, currentY)) {
      isDragging = false;
    }

    if (deltaY > 120) {
      wrapper.classList.remove('active');
    } else if (deltaY < -120) {
      wrapper.classList.add('active');
      scrollArea.scrollTop(1);
    }
  }

  function isInsideCateList(currentX, currentY) {
    const cateListRect = cateList.getBoundingClientRect();
    return currentY >= cateListRect.top && currentY <= cateListRect.bottom;
  }
}

//map
function kakakoMapInit(imgsrc, imgWidth, imgHeight) {
  if (typeof kakao === 'undefined') return;
  const mapContainer = document.getElementById('companyMap');
  if (!mapContainer) return;
  const mapLocation = {
    x: 37.52290018986694,
    y: 126.90216456726594
  };
  const mapOptions = {
    center: new kakao.maps.LatLng(mapLocation.x, mapLocation.y),
    level: 3
  };
  const map = new kakao.maps.Map(mapContainer, mapOptions);

  const imageSrc = imgsrc; // 마커이미지의 주소
  let imageSize;
  let imageOption;
  if (window.innerWidth < 800) {
    imageSize = new kakao.maps.Size(imgWidth / 2, imgHeight / 2); // 마커이미지의 크기
    imageOption = {
      offset: new kakao.maps.Point(imgWidth / 4, imgHeight / 2)
    };
  } else {
    imageSize = new kakao.maps.Size(imgWidth, imgHeight); // 마커이미지의 크기
    imageOption = {
      offset: new kakao.maps.Point(imgWidth / 2, imgHeight)
    };
  }
  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  const markerPosition = new kakao.maps.LatLng(mapLocation.x, mapLocation.y);
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage
  });
  marker.setMap(map);
}

// Work
let $tagSwiper;
let $workGrid;
let $tagFilterAry = [];
function workUI() {
  function initSwiper() {
    destroySwiper(); // 리셋
    if ($('.tag-menu .swiper-slide').length) {
      $tagSwiper = new Swiper('.tag-menu', {
        slidesPerView: 'auto'
        // 자동 슬라이더는 보류
        // on: {
        //   click: function (swiper, event) {
        //     itemClick(event);
        //   }
        // }
      });
    }
  }

  function destroySwiper() {
    if ($tagSwiper) {
      $tagSwiper.destroy(true, true);
      $tagSwiper = undefined;
    }
  }

  function handleWindowResize() {
    if (window.innerWidth > 1024) {
      destroySwiper();
    } else {
      initSwiper();
    }
  }
  window.addEventListener('resize', handleWindowResize), document.addEventListener('DOMContentLoaded', handleWindowResize);

  // init Isotope
  if ($('.work-wrap .grid-item').length) {
    // workItemSize();
    $workGrid = $('.work-wrap .grid').isotope({
      layoutMode: 'packery',
      itemSelector: '.grid-item'
    });
    const grid = document.querySelector('.work-wrap .grid');
    imageLoadIsotope($workGrid, grid);
  }

  //클릭시 sorting
  $('.tag-menu .tag-item').on('click', function (e) {
    const $this = $(e.target).parents('.swiper-slide');
    e.preventDefault();
    if (!$this.children('a').hasClass('tag-item')) return;
    // e.preventDefault();
    const $value = '.' + $this.children('a').data('value');
    if ($value === '.all') {
      if ($this.hasClass('on')) return;
      $('.tag-menu .swiper-slide').removeClass('on');
      $this.addClass('on');
      $tagFilterAry = [];
    } else {
      if ($this.hasClass('on')) {
        $this.removeClass('on');
        if ($value === '.') return;
        let aryIdx = $tagFilterAry.indexOf($value);
        if (aryIdx !== -1) $tagFilterAry.splice(aryIdx, 1);
        // on 되어있는 item이 하나도 없다면 all로 지정
        if ($('.on').length === 0) {
          $tagFilterAry = [];
          $('.tag-item[data-value="all"]').parents('.swiper-slide').addClass('on');
        }
      } else {
        $this.addClass('on');
        if ($value === '.') return;
        $tagFilterAry.push($value);
        $('.tag-item[data-value="all"]').parents('.swiper-slide').removeClass('on');
      }
    }

    tagFilterInit($tagFilterAry);
  });

  function tagFilterInit($ary) {
    const filterValue = $ary.length ? $ary.join(', ') : '*';
    $workGrid.isotope({ filter: filterValue });
    // workItemSize();
  }
}

function workItemSize() {
  const $none = $('.work-wrap .list-none');
  const $item = $workGrid ? $workGrid.isotope('getFilteredItemElements') : $('.work-wrap .grid-item');
  const $showItem = $item.length;
  $('.work-wrap .grid-item').removeClass('large');
  if ($showItem) {
    if ($none.is(':visible')) $none.hide();
    $.each($item, function (i) {
      const $this = $(this);
      const idx = i % 8;
      if (idx === 3 || idx === 4) $this.addClass('large');
      if ($workGrid) $workGrid.isotope('layout');
    });
  } else {
    if (!$none.is(':visible')) $none.show();
  }
}

// news
let $newsGrid;
function newsUI() {
  if (!$('.news-wrap .grid').length) return;
  $newsGrid = $('.news-wrap .grid').isotope({
    percentPosition: true,
    itemSelector: '.grid-item'
  });
  const grid = document.querySelector('.news-wrap .grid');
  imageLoadIsotope($newsGrid, grid);
}

function imageLoadIsotope(event, wrap) {
  const images = wrap.querySelectorAll('img');
  let loadedCount = 0;

  // 이미지 로드 완료후에 isotope 실행
  function checkAllImagesLoaded() {
    loadedCount++;
    // if (loadedCount === images.length) {
    event.isotope('layout');
    // }
  }
  // 이미지 로드 완료 체크
  images.forEach((image) => {
    if (image.complete) {
      checkAllImagesLoaded();
    } else {
      image.addEventListener('load', checkAllImagesLoaded);
    }
  });
}
// header fixed 위치
function getOffset(element) {
  let $el = element;
  let $elX = 0;
  let $elY = 0;
  let isSticky = false;
  while ($el && !Number.isNaN($el.offsetLeft) && !Number.isNaN($el.offsetTop)) {
    let $style = window.getComputedStyle($el);
    // const $matrix = new WebKitCSSMatrix($style.transform);
    if ($style.position === 'sticky') {
      isSticky = true;
      $el.style.position = 'static';
    }
    $elX += $el.offsetLeft;
    // $elX += $matrix.m41; //translateX
    $elY += $el.offsetTop;
    // $elY += $matrix.m42;  //translateY
    if (isSticky) {
      isSticky = false;
      $el.style.position = '';
      if ($el.getAttribute('style') === '') $el.removeAttribute('style');
    }
    $el = $el.offsetParent;
    if ($el !== null) {
      $style = window.getComputedStyle($el);
      $elX += parseInt($style.borderLeftWidth);
      $elY += parseInt($style.borderTopWidth);
    }
  }
  return { left: $elX, top: $elY };
}
function checkUrl() {
  const url = window.location.href;
  if (window.location.href.includes('work.html') || window.location.href.includes('about.html')) {
    $('#header').addClass('in-white');
  } else {
    $('#header').removeClass('in-white');
  }
}
