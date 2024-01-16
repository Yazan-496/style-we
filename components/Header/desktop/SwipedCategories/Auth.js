import { AuthSVG } from "components/svgs";
import Link from "helpers/Link";

const Auth = () => {
  return (
    <a href="/account/login">
      <a className="header-account">
        <span className="flex items-center left text-ellipsis">
          <AuthSVG />
          <span className="text-black">Sign in / Join Free</span>
        </span>
      </a>
    </a>
  );
};
export default Auth;
