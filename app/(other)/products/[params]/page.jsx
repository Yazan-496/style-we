import  Listing from "components/Pages/Products"
import axios from 'axios'

export async function generateMetadata({ params, searchParams }, parent) {
 const metadata = await getMetaDataFunction(params)
    return metadata
}

const ProductsDesktop = ( ) => {
  return <Listing />;
};

export default ProductsDesktop;

const getMetaDataFunction = async ({ params }) => {
    const defaultDescription =
        `<p><strong>${process.env.NEXT_PUBLIC_BASE_TITLE} is the ecommerce version  and the online operational name of Master out`;
    const defaultTitle = `Welcome To ${process.env.NEXT_PUBLIC_BASE_TITLE}`;
    let seoProduct = {
        title: null,
        description: null,
    };

    const decodedParams = decodeURIComponent(params);
    if (decodedParams && decodedParams.length > 0) {
        const parts = decodedParams.split("&");

        for (const part of parts) {
            const [key, value] = part.split("=");
            if (key === "category") {
                const seo = await axios
                    .get(`${process.env.NEXT_PUBLIC_BASE_URL_LIVE}api/web_v10/products?category=${value}`)
                    .then((res) => {
                        return res.data.data;
                    });

                if (seo?.category_title) {
                    seoProduct.title = seo.category_title;
                }
                if (seo?.category_seo_description) {
                    seoProduct.description = seo.category_seo_description;
                }
            }
        }
    }

    return {
        title: seoProduct?.title || defaultTitle,
        description: seoProduct?.description || defaultDescription,
    };
};