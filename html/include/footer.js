function includeFooter() {
  let str = `
<footer id="footer" class="footer">
  <div class="inner">
    <div class="logo" role="img" aria-label="최재석의 포트폴리오"></div>
    <div class="f-menu-list">
    </div>
    <div class="f-info-grp">  
      <div class="info-box">
        <div class="tit">Experience</div>
        <div class="txt">
          <a href="https://weak-hell-eee.notion.site/2d3d46708c754a66b1b3504dd4c83884">경력기술서 페이지 바로가기</a>
        </div>
      </div>   
      <div class="info-box">
        <div class="tit">Contact</div>
        <div class="txt">          
          <a href="mailto:photosynthesis0131@gmail.com">photosynthesis0131@gmail.com</a>
        </div>
      </div>
    </div>
    <span class="copyright">&copy; 2024. Choi Jae Seok All Rights Reserved.</span>
  </div>
</footer>
<div class="scroll-top"><button type="button" class="btn-scroll-top" aria-label="페이지 상단으로 이동"></button></div>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeFooter();
