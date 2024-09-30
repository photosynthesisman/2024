function includeFooter() {
  let str = `
<footer id="footer" class="footer">
  <div class="inner">    
    <div class="f-menu-list">
    </div>
    <div class="f-info-grp">     
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
