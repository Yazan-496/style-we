const collections = [
  {
    name: "HOME",
    isRed: false,
    isHot: false,
    subCategories: [],
  },
  {
    name: "CLOTHING",
    isRed: true,
    isHot: false,
    subCategories: [
      {
        name: "Shop By Category",
        link: "/collections/clothing",
        type: "list",
        content: [
          {
            name: "Tops",
            link: "/collections/tops-67270",
            isRed: true,
          },
          {
            name: "Dresses",
            link: "/collections/dresses-67263",
            isRed: true,
          },
          {
            name: "Outerwear",
            link: "/collections/outerwear-67285",
            isRed: false,
          },
          {
            name: "Matching Sets",
            link: "/collections/jumpsuits-sets",
            isRed: true,
          },
          {
            name: "Bottoms",
            link: "/collections/bottoms-67286",
            isRed: false,
          },
          {
            name: "Beachwear",
            link: "/collections/swimwear",
            isRed: true,
          },
        ],
      },
      {
        name: "Featured Shops",
        link: "/collections/ss-2021-67472",
        type: "list",
        content: [
          {
            name: "BEST SELLERS",
            link: "/collections/ss-2021-67472",
            isRed: true,
          },
          {
            name: "Special Event",
            link: "/collections/for-your-shining-moments",
            isRed: true,
          },
          {
            name: "SS 2023",
            link: "/collections/ss-2023",
            isRed: false,
          },
          {
            name: "Elegant Shop",
            link: "/collections/elegant-2022",
            isRed: true,
          },
          {
            name: "Casual Shop",
            link: "/collections/casual",
            isRed: false,
          },
          {
            name: "Print Shop",
            link: "/collections/floral-shop",
            isRed: true,
          },
          {
            name: "Work Shop",
            link: "/collections/work-2022",
            isRed: true,
          },
          {
            name: "Basic Shop",
            link: "/collections/essentials",
            isRed: false,
          },
          {
            name: "Designer Shop",
            link: "/collections/stylewe",
            isRed: true,
          },
        ],
      },
      {
        name: "Photos",
        type: "photos",
        content: [
          {
            src: "/image/catalog/activity/oHoAzT0XH51679453052.jpg",
            link: "/collections/ss-2021-67472",
          },
          {
            src: "/image/catalog/activity/whKazC7sma1679453065.jpg",
            link: "/collections/jumpsuits-sets",
          },
        ],
      },
    ],
  },
  {
    name: "NEW IN",
    isRed: false,
    isHot: false,
    subCategories: [
      {
        name: "View All New",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [
          {
            name: "Dresses",
            link: "/collections/new-dresses-67201",
            isRed: true,
          },
          {
            name: "Tops",
            link: "/collections/new-tops-66845",
            isRed: true,
          },
          {
            name: "Outerwear",
            link: "/collections/new-outerwear",
            isRed: false,
          },
          {
            name: "Bottoms",
            link: "/collections/new-bottoms-66850",
            isRed: false,
          },
          {
            name: "Swimwear",
            link: "/collections/new-in-swimwear",
            isRed: true,
          },
          {
            name: "Accessories",
            link: "/collections/new-accessories-67204",
            isRed: false,
          },
        ],
      },
      {
        name: "Photos",
        type: "photos",
        content: [
          {
            src: "/image/catalog/activity/TDWmQvGUYC1679453083.jpg",
            link: "/collections/what%E2%80%98s-new",
          },
          {
            src: "/image/catalog/activity/uz8BWhoL1s1679453108.jpg",
            link: "/collections/dopamine",
          },
        ],
      },
    ],
  },
  {
    name: "TOPS",
    isRed: true,
    isHot: false,
    subCategories: [
      {
        name: "Shop By Category",
        link: "/collections/tops-67270",
        type: "list",
        content: [
          {
            name: "Blouses & Shirts",
            link: "/collections/blouse-shirts-67271",
            isRed: true,
          },
          {
            name: "Tees",
            link: "/collections/t-shirt-67272",
            isRed: false,
          },
          {
            name: "Tanks & Camis",
            link: "/collections/tanks-and-camis-67274",
            isRed: false,
          },
          {
            name: "Sweaters",
            link: "/collections/sweaters-cardigans",
            isRed: false,
          },
          {
            name: "Women Tops",
            link: "/collections/women-tops",
            isRed: false,
          },
        ],
      },
      {
        name: "Shop By Trend",
        link: "/collections/tops-67270",
        type: "list",
        content: [
          {
            name: "Elegant Tops",
            link: "/collections/blouse-shirts-67271",
            isRed: true,
          },
          {
            name: "Vacation Tops",
            link: "/collections/t-shirt-67272",
            isRed: true,
          },
          {
            name: "Print Tops",
            link: "/collections/tanks-and-camis-67274",
            isRed: false,
          },
          {
            name: "Casual Tops",
            link: "/collections/sweaters-cardigans",
            isRed: false,
          },
          {
            name: "Basic Tops",
            link: "/collections/women-tops",
            isRed: true,
          },
          {
            name: "Work Tops",
            link: "/collections/women-tops",
            isRed: false,
          },
        ],
      },
      {
        name: "Shop By Color",
        link: "/collections/tops-67270",
        type: "list",
        content: [
          {
            name: "White",
            link: "/collections/blouse-shirts-67271",
            isRed: false,
          },
          {
            name: "Black",
            link: "/collections/t-shirt-67272",
            isRed: false,
          },
        ],
      },
      {
        name: "Photos",
        type: "photos",
        content: [
          {
            src: "/image/catalog/activity/iI50nohjED1679453166.jpg",
            link: "/collections/satin-tops",
          },
          {
            src: "/image/catalog/activity/ebkto02fvs1679453190.jpg",
            link: "/collections/sleeveless",
          },
        ],
      },
    ],
  },
  {
    name: "DRESSES",
    isRed: true,
    isHot: true,
    subCategories: [
      {
        name: "Shop By Length",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [
          {
            name: "Maxi Dresses",
            link: "/collections/new-dresses-67201",
            isRed: false,
          },
          {
            name: "Midi Dresses",
            link: "/collections/new-tops-66845",
            isRed: false,
          },
          {
            name: "Mini Dresses",
            link: "/collections/new-outerwear",
            isRed: false,
          },
          {
            name: "Plus Dresses",
            link: "/collections/new-bottoms-66850",
            isRed: false,
          },
        ],
      },
      {
        name: "Shop By Trend",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [
          {
            name: "Party & Cocktail Dresses",
            link: "/collections/new-dresses-67201",
            isRed: true,
          },
          {
            name: "Vacation Dresses",
            link: "/collections/new-tops-66845",
            isRed: false,
          },
          {
            name: "Shirt Dresses",
            link: "/collections/new-outerwear",
            isRed: true,
          },
          {
            name: "Floral Dresses",
            link: "/collections/new-bottoms-66850",
            isRed: false,
          },
          {
            name: "Off Shoulder Dresses",
            link: "/collections/new-outerwear",
            isRed: true,
          },
        ],
      },
      {
        name: "Shop By Style",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [
          {
            name: "Elegant",
            link: "/collections/new-dresses-67201",
            isRed: true,
          },
          {
            name: "Casual",
            link: "/collections/new-tops-66845",
            isRed: false,
          },
          {
            name: "Work",
            link: "/collections/new-outerwear",
            isRed: false,
          },
          {
            name: "Basic",
            link: "/collections/new-bottoms-66850",
            isRed: true,
          },
        ],
      },
      {
        name: "Shop By Color",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [
          {
            name: "Dopamine",
            link: "/collections/new-dresses-67201",
            isRed: true,
          },
          {
            name: "Black",
            link: "/collections/new-tops-66845",
            isRed: false,
          },
          {
            name: "White",
            link: "/collections/new-outerwear",
            isRed: false,
          },
        ],
      },
      {
        name: "Photos",
        type: "photos",
        content: [
          {
            src: "/image/catalog/activity/TDWmQvGUYC1679453083.jpg",
            link: "/collections/what%E2%80%98s-new",
          },
          {
            src: "/image/catalog/activity/uz8BWhoL1s1679453108.jpg",
            link: "/collections/dopamine",
          },
        ],
      },
    ],
  },
  {
    name: "BOTTOMS",
    isRed: false,
    isHot: false,
    subCategories: [
      {
        name: "Shop all",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [
          {
            name: "Pants",
            link: "/collections/new-dresses-67201",
            isRed: false,
          },
          {
            name: "Jeans",
            link: "/collections/new-tops-66845",
            isRed: false,
          },
          {
            name: "Skirts",
            link: "/collections/new-outerwear",
            isRed: false,
          },
          {
            name: "Jumpsuits",
            link: "/collections/new-outerwear",
            isRed: false,
          },
        ],
      },
      {
        name: "Photos",
        type: "photos",
        content: [
          {
            src: "/image/catalog/activity/TDWmQvGUYC1679453083.jpg",
            link: "/collections/what%E2%80%98s-new",
          },
          {
            src: "/image/catalog/activity/uz8BWhoL1s1679453108.jpg",
            link: "/collections/dopamine",
          },
        ],
      },
    ],
  },
  {
    name: "PLUS+CURVE",
    isRed: true,
    isHot: false,
  },
  {
    name: "SPECIAL OCCASIONS",
    isRed: true,
    isHot: false,
  },
  {
    name: "SWIMWEAR",
    isRed: false,
    isHot: false,
  },
  {
    name: "ACCESSORIES",
    isRed: false,
    isHot: false,
  },
  {
    name: "SALE",
    isRed: true,
    isHot: true,
  },
  {
    name: "FOLLOW US",
    isRed: false,
    isHot: false,
    subCategories: [
      {
        name: "FB GROUP",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [],
      },
      {
        name: "IG PAGE",
        link: "/collections/what%E2%80%98s-new",
        type: "list",
        content: [],
      },
    ],
  },
];
const SideBar = () => {
  return (
    <div className="sidebar">
      <ul>
        {collections.map((collection, i) => {
          return (
            <li key={i}>
              <div
                className={`cursor-pointer text-base font-bold ${
                  collection.isRed ? "text-red-600" : ""
                }`}
              >
                {collection.name}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="customize">
        <a href="/account">Order List</a>
        <a href="/account/address">Address</a>
        <a href="/account/changepassword">Change password</a>
        <a href="/order-query">Tracking order</a>
        <div className="dropdown-language-m notranslate">
          <div>
            <span className="current-language-mobile">English</span>
            <svg aria-hidden="true" className="icon" title="select">
              <use xlinkHref="#select" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SideBar;
