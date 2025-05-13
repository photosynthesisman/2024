function includeHeader() {
  let str = `
<header id="header" class="header">
  <div class="inner">
    <h1 class="h1"><a href="./" aria-label="홈페이지 바로가기">최재석의 포트폴리오</a></h1>    
  </div>
</header>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeHeader();
