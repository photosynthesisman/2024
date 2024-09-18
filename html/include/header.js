function includeHeader() {
  let str = `
<header id="header" class="header">
  <div class="inner">
    <h1 class="h1"><a href="/" aria-label="홈페이지 바로가기">최재석의 포트폴리오</a></h1>
    <div class="right">
      <button type="button" aria-label="메뉴 열기" class="btn-menu">
        <strong>MENU</strong>
        <span aria-hidden="true" class="gnb-icon"> </span>
      </button>
      <nav class="commonGnb">
        <ol>
          <li class="menu-li"><a href="../">Home</a></li>
          <li class="menu-li"><a href="../about.html">About</a></li>
          <li class="menu-li"><a href="../work.html">Work</a></li>          
        </ol>                
      </nav>
    </div>
  </div>
</header>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeHeader();
