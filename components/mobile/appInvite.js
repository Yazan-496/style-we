export default function AppInvite({ closeAppInvite }) {
  return (
    <div
      id="app-invite-main"
      className="hidden flex layout-header__download-app-tips"
    >
      <span
        className="layout-header__icon-close layout-header__close"
        onClick={() => {
          closeAppInvite();
        }}
      >
        <i className="iconfont icon-install_icon_close"></i>
      </span>
      <img
        className="layout-header__img"
        src="/image/catalog/activity/uhsBedVA741655264935.jpg"
      />
      {/* <Image
          className="media-wrap image-wrap"
          src="/image/catalog/activity/dMOf3EPxXA1648612410.jpg"
          alt="3"
          width="500"
          height="500"
        /> */}
      <span className="layout-header__info">
        <div className="layout-header__title">STYLEWE</div>
        <div className="layout-header__tips">APP 1st ORDER 25% OFF</div>
        <div className="layout-header__stars">
          <i className="iconfont icon-p_icon_star"></i>
          <i className="iconfont icon-p_icon_star"></i>
          <i className="iconfont icon-p_icon_star"></i>
          <i className="iconfont icon-p_icon_star"></i>
          <i className="iconfont icon-p_icon_star"></i>
          <span className="star-count">(6953)</span>
        </div>
      </span>
      <span
        className="layout-header__btn"
        data-statis='{"ec":"top_app_download"}'
        data-collect-click='{"event_id":"top_app_download"}'
      >
        <a data-href="/MkCn/o1my9vqq" id="appdownload-url">
          GET
        </a>
      </span>
    </div>
  );
}
