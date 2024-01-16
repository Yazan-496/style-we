import Link from "helpers/Link";

const NavElement = (props) => {
  return (
    <div
      onMouseLeave={() => {
        if (
          document.getElementById(`nav-element-${props.index}`) &&
          !document
            .getElementById(`category-num-${props.index}`)
            .matches(":hover")
        ) {
          document
            .getElementById(`nav-element-${props.index}`)
            .classList.add("hidden");
        }
      }}
      id={`nav-element-${props.index}`}
      key={`nav-element-${props.index}`}
      className="top-auto absolute z-10 w-full left-0 -translate-y-px mx-auto py-5 px-[50px] bg-white border-b border-solid border-b-[#e7e7e7] shadow-[0_1px_4px_rgba(0,0,0,0.15)] hidden"
    >
      <div className="max-w-[1450px] mx-auto flex justify-center">
        {props.category.subCategories?.map((sub, index) => {
          if (sub.type === "list") {
            return (
              <div className="m-5" key={`list-${index}-${props.index}`}>
                <Link className="relative block group-1 leading-none cm-nav-2 mb-5" href={`/products/category=${sub.slug}`}>
                    <span className="whitespace-nowrap text-900 group-1-hover:text-[color:var(--cm-color-hover-link)]">
                      {sub.name}
                    </span>
                </Link>
                {sub.childes.map((one, index2) => (
                  <Link
                    href={`/products/category=${one.slug}`}
                    key={`list-${index2}`}
                    className="relative block group-1 leading-none cm-nav-3 mb-3"
                  >
                      {one.isRed ? (
                        <span className="whitespace-nowrap text-red-900 group-1-hover:text-[color:var(--cm-color-hover-link)]">
                          {one.name}
                        </span>
                      ) : (
                        <span className="whitespace-nowrap text-red-700 group-1-hover:text-[color:var(--cm-color-hover-link)]">
                          {one.name}
                        </span>
                      )}
                  </Link>
                ))}
              </div>
            );
          } else if (sub.type === "photos") {
            return (
              <div
                className="flex items-start justify-center max-w-[660px] m-5 gap-5"
                key={`list-${index}-${props.index}`}
              >
                {sub.content.map((one, index) => (
                  <div
                    className="max-w-[370px] text-center"
                    key={`photos-${index}`}
                  >
                    <div className="relative">
                      <Link href={one.link}>
                          <img src={one.src} alt="navigation photo ad" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default NavElement;
