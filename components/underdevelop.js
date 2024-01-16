import Link from "helpers/Link";
import FloatingLeft from "components/FloatingDiscount/desktop";
import RightSideChat from "components/common/RightSideChat";
import Header from "components/Header/desktop";
import Footer from "components/Footer/desktop";

export default function UnderDev() {
  return (
    <div className="relative min-w-[1024px]">
      {/*<FloatingLeft />*/}
      {/* <RightSideChat /> */}
      <Header />
      <div className="layout-container">
        <div className="indexstyle-sc-106biaf-0 kOQlpN">
          <h4 className="error-code">404</h4>
          <div className="error-tips">
            The page you are looking for is under development!! come back soon
            !!
          </div>
          <Link className="indexstyle-sc-147lzxr-0 iiKxiz back-to-home" href="/">
              <div className="children-container">BACK TO HOMEPAGE</div>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
