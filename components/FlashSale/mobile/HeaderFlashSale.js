import { SvgFlash } from "components/svgs"
import { SvgArrowLeft } from "../../svgs"
import Link from "helpers/Link"

const HeaderFlashSale = () => {
  return (
    <div className="bg-[#fff] indexstyle-gqfl8m-0 bg-[#ffffff] p-[1px] flex items-center justify-between sticky-header-mobile-first">
      <Link className="-left-[0] relative cursor-pointer " href="/">
        <SvgArrowLeft />
      </Link>
      <header className="flex justify-center text-black items-center">
        <div className="font-[700] yNmMBmb"><SvgFlash /></div>
        <p className="flash-sale-title font-[700] text-lg ">Flash Sale</p>
      </header>
      <div></div>
    </div>
  )
}
export default HeaderFlashSale
