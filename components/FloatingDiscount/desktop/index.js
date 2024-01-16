import Image from "next/legacy/image";
import styles from "styles/Home.module.css";

const FloatingLeft = ({ popupBanners }) => {
  return (
    <>
      <div className={styles.stream_subscribe_float}>
        <img
          alt="stream subscribe float"
          src={
            "https://d2q8lslmdp9f7.cloudfront.net/library/20211210/114751_028244/RYSL6YlHqcgl1pnfUN4H08u8TGVrMfTB.gif"
          }
          width={100}
          height={100}
        />
      </div>
    </>
  );
};

export default FloatingLeft;
