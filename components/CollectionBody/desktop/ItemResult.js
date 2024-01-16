import React, { useEffect, useRef, useState } from 'react';
import Product from '../../Body/desktop/productItem';
import { XSvg } from '../../svgs';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingComponent from '../../LoadingComponent/desktop';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import HTMLRenderer from '../../../helpers/HTMLRenderer';
import { LoaderCategory } from '../../../helpers/Loader/Loading';
import NewProduct from '../../common/NewProduct';
import FlashSaleCard from '../../common/FlashSaleCard';

const ItemResult = ({ name, filteredItems, setRemoveFromFilter }) => {
    const { t, i18n } = useTranslation('translation');
    const SortBy = [
        { name: t('filter.latest'), value: 'latest', key: 'latest' },
        { name: t('filter.oldest'), value: 'oldest' },
        { name: t('filter.low_high'), value: 'low-high' },
        { name: t('filter.high_low'), value: 'high-low' },
        { name: t('filter.a_z'), value: 'a-z' },
        { name: t('filter.z_a'), value: 'z-a' },
    ];
    const FilterSelect = [
        { name: t('filter.best_selling'), value: 'best-selling' },
        { name: t('filter.top_rated'), value: 'top-rated' },
        { name: t('filter.most_favorite'), value: 'most-favorite' },
        { name: t('filter.featured_deal'), value: 'featured_deal' },
        // { name: t('filter.discounted'), value: 'discounted' },
    ];
    const Update_Filters = useSelector(
        (state) => state.ProductReducer.Update_Filters
    );
    const dispatch = useDispatch();
    const [filters, setFilters] = useState([]);
    const [NewFilters, setNewFilters] = useState(false);
    const productLoading = useSelector(
        (state) => state?.ProductReducer?.productLoading
    );
    const paginationLoading = useSelector(
        (state) => state?.ProductReducer?.paginationLoading
    );
    const offset = useSelector((state) => state.ProductReducer.offset);
    const Products = useSelector((state) => state.ProductReducer.Products);
    const ItemsProducts = useSelector(
        (state) => state.ProductReducer.ItemsProducts
    );
    const searchResult = useSelector(
        (state) => state.ProductReducer.searchResult
    );
    const page = useSelector((state) => state.ProductReducer.page);
    const [sortByValue, setSortByValue] = useState('');
    const [filterSelectValue, setFilterSelectValue] = useState('');
    const ObjectToArray = (filteredItems) => {
        return Object.entries(filteredItems).map(([key, value]) => ({
            key,
            value,
        }));
    };

    useEffect(() => {
        setFilters(ObjectToArray(Update_Filters));
        // console.log(Update_Filters, "filteredItems");
    }, [Update_Filters]);
    useEffect(() => {
        // console.log(ItemsProducts, "ItemsProducts");
    }, [ItemsProducts]);
    useEffect(() => {}, [filters]);
    useEffect(() => {}, [NewFilters]);

    function getFilteredValues(filter) {
        return Object.entries(filter)
            .filter(([key, value]) => value === true)
            .map(([key, value]) => key);
    }

    const handleRemoveFromFilter = (attribute, item) => {
        // setRemoveFromFilter({ attribute, item });
        dispatch({ type: 'Delete_Filters', payload: { attribute, item } });
    };

    function handleFilterSelectChange(event) {
        const selectedValue = event.target.value;
        setFilterSelectValue(selectedValue);
        dispatch({ type: 'Set_Filter', payload: { filter: selectedValue } });
    }

    function handleSortByChange(event) {
        const selectedValue = event.target.value;
        setSortByValue(selectedValue);
        dispatch({ type: 'Set_SortBy', payload: { sortBy: selectedValue } });
    }

    function handleIncreaseOffset() {
        if (!productLoading || !Products?.total_size > ItemsProducts.length) {
            dispatch({ type: 'INCREASE_OFFSET' });
        }
    }

    const viewMoreButtonRef = useRef(null);

    useEffect(() => {
        window.addEventListener('scroll', function () {
            const buttonElement = viewMoreButtonRef.current;

            if (buttonElement) {
                const buttonRect = buttonElement?.getBoundingClientRect();
                const isButtonVisible = buttonRect.top < window.innerHeight;

                if (isButtonVisible) {
                    // console.log("isButtonVisible");
                    // console.log(productLoading, "productLoading");
                    handleIncreaseOffset();
                }
            }
        });
    }, [productLoading]);

    function handleDecreaseOffset() {
        dispatch({ type: 'Decrease_Offset' });
    }

    function setHid(productLoading, length) {
        return !productLoading && !length > 0;
    }

    return (
        <div className="w-full lg:w-[calc(100%-216px-24px)] sm:w-[calc(100%-216px-24px)] md:w-[calc(100%-216px-24px)] p-2 pr-2">
            <span id=" collection-product-total-number">
                {Products?.category_h1 && (
                    <HTMLRenderer htmlContent={Products?.category_h1} />
                )}
            </span>
            <div className="flex items-center gap-4 lg:mb-5 flex-wrap w-full">
                {productLoading ? (
                  <LoaderCategory
                    notPadding={true}
                    width={100}
                    height={30}
                    viewBox={'0 0 330 70'}
                  />
                ) : !ItemsProducts ? (
                  <div className={`flex items-center gap-3 p-4 pl-2 pr-3 space-x-2`}>
                    <span className="text-center">
                        ....
                    </span>
                  </div>
                ) : ItemsProducts?.length === 0 ? (
                  <div className={`flex items-center gap-3 p-4 pl-2 pr-3 space-x-2`}>
                    <span className="text-center">
                      {ItemsProducts?.length} {t('user.of')} {t('user.products')}
                    </span>
                  </div>
                ) : (
                  <div className={`flex items-center gap-3 p-4 pl-2 pr-3 space-x-2`}>
                    <span className="text-center">
                      {ItemsProducts?.length} {t('user.of')} {Products?.total_size} {t('user.products')}
                    </span>
                  </div>
                )}

                {filters?.map((filter) => {
                    return (
                        <div className="flex items-center gap-3 p-4 pl-2 pr-3 space-x-2">
                            {filter.value.map(
                                (key, index) =>
                                    typeof key.key !== 'number' && (
                                        <div
                                            className="truncate flex items-center space-x-4 min-w-[50px]  bg-[#E0E1E3] text-lg flex flex-row items-start justify-center"
                                            key={index}
                                        >
                                            <span className="pl-[6px] text-base leading-[35px] text-[#484C52]">
                                                {key.key}
                                            </span>
                                            <span
                                                onClick={() =>
                                                    handleRemoveFromFilter(
                                                        key,
                                                        filter?.key
                                                    )
                                                }
                                                className="pr-[6px] cursor-pointer"
                                            >
                                                <XSvg />
                                            </span>
                                        </div>
                                    )
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex">
                <div className="w-[100%] lg:w-[50%] items-center gap-6 mb-5 lg:flex">
                    <FormControl className="w-[100%] lg:w-[50%]">
                        <InputLabel id="SortBy-select-label">
                            {t('user.sortby')}
                        </InputLabel>
                        <Select
                            className="w-[100%]"
                            labelId="SortBy-select-label"
                            id="SortBy-select-label"
                            value={sortByValue}
                            label={t('user.sortby')}
                            onChange={handleSortByChange}
                        >
                            {SortBy.map((option, i) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                            b    >
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <div className="w-[50%]"></div>
                    {/* <FormControl className="hidden w-[100%] lg:flex" fullWidth>
                        <InputLabel id="Filter-select-label">
                            {t('user.filter')}
                        </InputLabel>
                        <Select
                            className="w-[100%]"
                            labelId="Filter-select-label"
                            id="Filter-select-label"
                            value={filterSelectValue}
                            label={t('user.filter')}
                            onChange={handleFilterSelectChange}
                        >
                            {FilterSelect.map((option, i) => (
                                <MenuItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl> */}
                </div>
            </div>
            <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 ${ItemsProducts.length > 0 ? 'lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5' : 'lg:grid-cols-1 xl:grid-cols-1 2xl:grid-cols-1'}  gap-1`}>
                {ItemsProducts.length > 0 ? (
                    ItemsProducts?.map((product, index) => {
                        return (
                            <div key={index} className='p-1'>
                                <NewProduct
                                    product={product}
                                    imgClass='!h-72 sm:!h-[278px] md:!h-80 lg:!h-[380px] xl:!h-[440px] 2xl:!h-[490px]'
                                />
                            </div>
                        );
                    })
                ) : (
                    <div
                        className={`${
                            !productLoading && ItemsProducts.length === 0
                                ? 'hidden'
                                : ''
                        } flex items-center justify-center w-full h-[420px]`}
                    >
                        <LoadingComponent />
                    </div>
                )}
                <span
                    className={`${
                        !productLoading && ItemsProducts.length === 0
                            ? ''
                            : 'hidden'
                    }`}
                >
                    {/* {t('main.no_product_found')} */}
                </span>
            </div>
            <div
                className={`${
                    Products?.total_size > ItemsProducts.length &&
                    !productLoading
                        ? ''
                        : 'hidden'
                } collection-description__inner`}
            >
                <div
                    className={`${
                        Products?.products?.length > 0 && paginationLoading
                            ? ''
                            : 'hidden'
                    } flex items-center justify-center w-full h-[120px]`}
                >
                    <LoadingComponent />
                </div>
                {ItemsProducts.length > 0 && !paginationLoading && (
                    <div
                        className={`${
                            Products?.total_size > ItemsProducts.length
                                ? ''
                                : 'hidden'
                        } flex  flex-col items-stretch gap-5 mb-5`}
                    >
                        <div
                            style={{
                                alignSelf: 'center',
                            }}
                            className="bg-gray-100 p-1 w-[30%] h-[50%] flex items-center justify-center rounded-3xl style_paginationWrapper__YMATm"
                        >
                            <span
                                ref={viewMoreButtonRef}
                                className="hover:underline  cursor-pointer"
                                onClick={handleIncreaseOffset}
                            >
                                {t('main.view_more')}
                            </span>
                        </div>
                        <div className="text-center text-base text-[#868C93]">
                            {ItemsProducts?.length} {t('user.of')}{' '}
                            {Products?.total_size} {t('user.products')}
                            {/*A total of {Math.ceil(Products?.total_size / 20)} pages*/}
                        </div>
                    </div>
                )}
            </div>{' '}
        </div>
    );
};
export default ItemResult;
