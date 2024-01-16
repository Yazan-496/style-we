import Layout from './HeaderWithSearch/layout';
import Navigation from './HeaderWithSearch/navigation';

const HeaderDesktop = ({ loading, setCartOpen, hideHeader, categories }) => {
  return (
    <div
      id="headerMainComp"
      // className={`transition duration-100 ease-in-out ${
      //   hideHeader ? "-translate-y-[100%]" : "translate-y-[0]"
      // }`}
    >
      <div
        id="headerInsideComp"
        className={`bg-white border-b transition duration-100 ease-in-out border-[#00000026]`}
      >
        <Layout
          loading={loading}
          openCart={() => {
            setCartOpen(true);
          }}
        />
        {/*<Navigation loading={loading} categories={categories} />*/}
      </div>
    </div>
  );
};
export default HeaderDesktop;
