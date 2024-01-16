import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation("translation");
  return (
    <div className="indexstyle-sc-1ghwcqw-0 egrfLI shopping-process">
      <div className="shopping-process-item active">
        <div className="index">1</div>
        <div className="title">{t("user.shipping_bag")}</div>
      </div>
      <div className="shopping-process-eparate active" />
      <div className="shopping-process-item">
        <div className="index">2</div>
        <div className="title">{t("user.order_confirmation")}</div>
      </div>
      <div className="shopping-process-eparate" />
      <div className="shopping-process-item">
        <div className="index">3</div>
        <div className="title">{t("user.order_complete")}</div>
      </div>
    </div>
  );
};
export default Header;
