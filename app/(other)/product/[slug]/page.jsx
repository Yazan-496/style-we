import ProductDetailsPage from "components/Pages/Product";
import axios from "axios";

export async function generateMetadata({ params, searchParams }, parent) {
    return await getMetaDataFunction(params);
}
 const ProductDetailsDesktop = async ({ params: { slug } }) => {

    const productApi = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL_LIVE + `api/web_v10/products/details/${slug}`,
        {
            next: {revalidate: 1},
        }
    );
    const productRes = await productApi.json();
    const productDetail = productRes.data || {};

    return <ProductDetailsPage productProps={productDetail}/>;
};

export default ProductDetailsDesktop;

const getMetaDataFunction = async ({ slug }) => {
    const defaultDescription =
      `<p><strong>${process.env.NEXT_PUBLIC_BASE_TITLE} is the ecommerce version  and the online operational name of Master out`
    const defaultTitle = `Welcome To ${process.env.NEXT_PUBLIC_BASE_TITLE}`

    const seo = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL_LIVE}api/web_v10/products/details/${slug}`).then((res) => {
        return res.data.data
    })
    const seoProduct = { title: seo?.name, description: seo?.description, images: seo?.images, icon: seo?.thumbnail }

    return {
        title: seoProduct?.title || defaultTitle,
        description: seoProduct?.description || defaultDescription,
        openGraph: {
            images: seoProduct?.images || [],
            icons: {
                icon: seoProduct?.icon,
            },
        },
    }
}
