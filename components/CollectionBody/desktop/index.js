import { useEffect, useState } from 'react';
import CollectionHeader from './CollectionHeader';
import RecommendedItems from './RecommendedItem';
import FilterItems from './FilterItems';
import { useSelector } from 'react-redux';
import Toast from '../../../helpers/Toast/Big';
import { alertService } from 'components/Alert';

const CollectionBody = ({
    name,
    collections,
    Products,
    setFinalFilteredItems,
}) => {
    const toastMessage = useSelector(
        (state) => state?.CartReducer.toastMessage
    );
    const childCategories = useSelector(
        (state) => state.ProductReducer?.Products?.child_categories
    );
    const [children, setChildren] = useState([]);
    const [parentCategory, setParentCategory] = useState([]);
    const CategoriesReducer = useSelector(
        (state) => state.mainReducer?.mainPageData?.categories
    );
    function getSubCategoriesByName(categoryName, categoryArray) {
        if (categoryName) {
            for (const category of categoryArray) {
                const categories = categoryName?.split('-');
                setParentCategory(categories);
                const lastItem = categories[categories.length - 1]; // Get the first item of the array
                if (lastItem?.includes(category.name)) {
                    return category.childes;
                } else if (lastItem?.includes(category.category)) {
                    return category.sub_categories;
                }
                if (category.sub_categories) {
                    const subCategories = getSubCategoriesByName(
                        categoryName,
                        category.sub_categories
                    );
                    if (subCategories) {
                        return subCategories;
                    }
                }

                if (category.childes) {
                    const childes = getSubCategoriesByName(
                        categoryName,
                        category.childes
                    );
                    if (childes) {
                        return childes;
                    }
                }
            }
        }
        return [];
    }
    useEffect(() => {
        // const aa = getSubCategoriesByName(name, CategoriesReducer);
        // setChildren(aa);
    }, [name]);

    const ItemsProducts = useSelector(
        (state) => state.ProductReducer.ItemsProducts
    );
    useEffect(() => {}, [children]);
    return (
        <div className="cm-layout-max mx-auto w-full bg-white">
            <div className="flex flex-col items-stretch gap-y-2 lg:my-6 lg:gap-y-3">
                <CollectionHeader
                    Products={Products}
                    name={name}
                    collections={ItemsProducts}
                />
                <RecommendedItems
                    collections={childCategories}
                    parentCategory={parentCategory}
                />
                {/* <div className="flex space-x-4">
                    <button
                        onClick={() => {
                            alertService.alert({
                                ToastId: `message`,
                                message: `message-${new Date().getSeconds()}`,
                                autoClose: false,
                            });
                        }}
                    >
                        Alert
                    </button>

                    <button
                        onClick={() => {
                            alertService.dismiss({
                                ToastId: `message`,
                            });
                        }}
                    >
                        Dismiss
                    </button>
                </div> */}
                <FilterItems
                    collections={collections}
                    Products={Products}
                    setFinalFilteredItems={(finalFilteredItems) =>
                        setFinalFilteredItems(finalFilteredItems)
                    }
                />
            </div>
            {toastMessage && <Toast message={toastMessage} timeout={4000} />}
        </div>
    );
};
export default CollectionBody;
