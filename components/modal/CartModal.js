import React, { useState } from 'react';
import Modal from 'components/base/Modal';
import ModalBody from 'components/common/ModalBody';
import Image from 'helpers/image';
import Link from 'helpers/Link';
import SelectField from 'components/base/SelectField';
import Button from 'components/base/Button';
import GetMyDiscount from './GetMyDiscount';
import { useCart } from 'components/context/CartContext';

const CartModal = ({ closeStateCb, viewState, data }) => {
    const { addToCart } = useCart();
    const [modal, setModal] = useState(false);
    const { isCartOpen, setIsCartOpen } = useCart();
    const [activeTab, setActiveTab] = useState('regular');
    const [selectedSize, setSelectedSize] = useState(
        data?.choice_options?.options[0]
    );
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
    };

    const handlePrevButtonClick = () => {
        if (selectedImageIndex > 0) {
            setSelectedImageIndex(selectedImageIndex - 1);
        }
    };

    const handleNextButtonClick = () => {
        if (selectedImageIndex < data?.images.length - 1) {
            setSelectedImageIndex(selectedImageIndex + 1);
        }
    };

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleAddToCart = () => {
        setModal(true);
        setIsCartOpen(true);
        addToCart(data);
        closeStateCb();
    };

    return (
        <>
            <Modal
                visible={viewState}
                closeCb={closeStateCb}
                title=''
                modalClass='md:w-[720px] lg:w-[800px] 2xl:w-[1012px] h-[480px] lg:h-[620px]'
            >
                <form method='post' className='h-full'>
                    <ModalBody modalBodyClass='flex flex-row gap-x-3 h-full'>
                        {/* small image are here  */}
                        <div className='flex flex-col gap-y-3 h-full'>
                            {data?.images.length > 6 && (
                                <Button
                                    variant='primary'
                                    icon='fas fa-chevron-up'
                                    btnClass='!bg-[#f1f2f3] !h-6 flex items-center justify-center !text-black-primary'
                                    actionCb={handlePrevButtonClick}
                                    disabled={selectedImageIndex === 0}
                                />
                            )}
                            {data?.images.map((imageUrl, id) => (
                                <div
                                    key={id}
                                    className={`h-[70px] w-[50px] relative overflow-hidden group ${id === selectedImageIndex ? 'ring-1 ring-black-primary' : ''
                                        }`}
                                    onClick={() => handleImageClick(id)}
                                >
                                    <Image
                                        fill
                                        alt='image'
                                        className={`${id === selectedImageIndex ? 'scale-90' : 'scale-100'
                                            }`}
                                        src={imageUrl}
                                    />
                                </div>
                            ))}
                            {data?.images.length > 6 && (
                                <Button
                                    actionCb={handleNextButtonClick}
                                    variant='primary'
                                    icon='fas fa-chevron-down'
                                    btnClass='!bg-[#f1f2f3] !h-6 flex items-center justify-center !text-black-primary !sticky !bottom-4'
                                    disabled={selectedImageIndex === data?.images.length - 1}
                                />
                            )}
                        </div>
                        {/* big image  */}
                        <div className='w-[300px] h-[400px] 2xl:w-[372px] 2xl:h-[496px] relative'>
                            {data?.images.map((imageUrl, id) => (
                                <Image
                                    key={id}
                                    fill
                                    alt='image'
                                    src={imageUrl}
                                    className={`absolute top-0 left-0 transition-opacity duration-1000 ease-in-out object-contain ${id === selectedImageIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                />
                            ))}
                            {selectedImageIndex !== 0 && (
                                <Button
                                    actionCb={handlePrevButtonClick}
                                    variant='primary'
                                    icon='fas fa-chevron-left !text-base lg:!text-xl'
                                    btnClass='!bg-[#00000020] hover:!bg-[#00000040] flex items-center justify-center !absolute top-1/2 -translate-y-1/2 left-0 !w-9 !h-16 2xl:!w-[52px] 2xl:!h-[104px] text-white'
                                />
                            )}
                            {selectedImageIndex !== data?.images.length - 1 && (
                                <Button
                                    actionCb={handleNextButtonClick}
                                    variant='primary'
                                    icon='fas fa-chevron-right !text-base lg:!text-xl'
                                    btnClass='!bg-[#00000020] hover:!bg-[#00000040] flex items-center justify-center !absolute top-1/2 -translate-y-1/2 right-0 !w-9 !h-16 2xl:!w-[52px] 2xl:!h-[104px] text-white'
                                />
                            )}
                        </div>
                        {/* product-details details  */}
                        <div className='w-[362px] 2xl:w-[458px] pl-2 flex flex-col justify-between !h-full'>
                            <div className='w-full'>
                                <p className='text-lg 2xl:text-xl leading-6 line-clamp-2 capitalize text-black-primary font-medium'>
                                    {data?.name}
                                </p>
                                <div className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-row items-center gap-3 mt-4'>
                                        <p className='text-sm md:text-base xl:text-lg 3xl:text-3xl text-[#DC2626] font-bold'>
                                            ${data?.offer_price}
                                        </p>
                                        <p className='text-xs lg:text-sm xl:text-base font-normal text-[#868C93] line-through '>
                                            ${data?.price}
                                        </p>
                                        <p className='bg-black-primary text-xs text-white px-0.5'>
                                            -13%
                                        </p>
                                    </div>
                                    <Link
                                        href={`/product`}
                                        className='flex flex-row gap-x-2 items-center'
                                    >
                                        <div>
                                        <p className='text-sm 2xl:text-base text-black-primary'>
                                            Details
                                        </p>
                                        <i className='fa-solid fa-chevron-right text-xs 2xl:text-sm'></i>
                                        </div></Link>
                                </div>
                                {/* colors */}
                                <div className='flex flex-col justify-start items-start gap-y-3'>
                                    <div className='flex justify-start gap-2 capitalize text-black-primary text-base 2xl:text-lg'>
                                        color: <span className='font-bold'>Black</span>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        {data?.variation?.map((clr, index) => (
                                            <div
                                                key={index}
                                                className='h-8 w-8 2xl:h-9 2xl:w-9 flex justify-center items-center border border-black rounded-full bg-white'
                                            >
                                                <span className='h-6 w-6 2xl:h-7 2xl:w-7 rounded-full overflow-hidden relative'>
                                                    <Image
                                                        alt=''
                                                        fill
                                                        src={
                                                            'https://sstorage.clearance.ae/production/storage/product/2023-08-04-64ccaafb5233f.png'
                                                        }
                                                    />
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <div className="text-black-primary text-lg capitalize">
                    fit:
                  </div> */}
                                    <div className='flex justify-start items-center gap-x-3'>
                                        {/* {data?.variation.fit?.map((fit, i) => (
                    <button
                      key={i}
                      className={`p-1.5 2xl:p-2 border text-xs 2xl:text-sm uppercase w-fit border-black-primary ${
                        activeTab === fit
                          ? "bg-black-primary text-white"
                          : "bg-white text-black-primary"
                      }`}
                      onClick={() => handleTabClick(fit)}
                    >
                      {fit}
                    </button>
                  ))} */}
                                        {/* <button
                  className={`p-1.5 2xl:p-2 border text-xs 2xl:text-sm uppercase w-fit border-black-primary ${
                    activeTab === "regular"
                      ? "bg-black-primary text-white"
                      : "bg-white text-black-primary"
                  }`}
                  onClick={() => handleTabClick("regular")}
                >
                  regular
                </button>
                <button
                  className={`p-1.5 2xl:p-2 border text-xs 2xl:text-sm uppercase w-fit border-black-primary ${
                    activeTab === "plus"
                      ? "bg-black-primary text-white"
                      : "bg-white text-black-primary"
                  }`}
                  onClick={() => handleTabClick("plus")}
                >
                  plus
                </button> */}
                                    </div>
                                    {/* sizes area  */}
                                    <div className='flex justify-start items-center gap-x-3'>
                                        {data?.choice_options?.title && (
                                            <p className='text-gray text-lg capitalize'>
                                                {data?.choice_options?.title}:
                                            </p>
                                        )}
                                        {data?.choice_options?.options && (
                                            <SelectField
                                                dropdownItems={data?.choice_options?.options}
                                                currentItem={selectedSize}
                                                onChangeCb={(item) => {
                                                    setSelectedSize(item);
                                                }}
                                            />
                                        )}
                                    </div>
                                    {/* <Tab tabb={data?.variant[0]?.size} /> */}
                                    {/* sizes area ends  */}
                                </div>
                            </div>
                            <div className='sticky bottom-4 flex flex-row justify-between gap-x-2.5 2xl:gap-x-4 w-full'>
                                {/* Add to cart button  */}
                                <Button
                                    actionCb={handleAddToCart}
                                    btnText='Add to cart'
                                    variant='primary'
                                    btnClass='hover:!opacity-90 !text-base 2xl:!text-lg !font-bold !w-[65%] lg:!w-[72%] rounded'
                                />
                                <Button
                                    actionCb={() => { }}
                                    btnText='Buy it now'
                                    variant='outlined'
                                    btnClass='hover:!opacity-90 !w-auto !px-2 2xl:!px-3 rounded !text-sm 2xl!text-base font-semibold'
                                />
                            </div>
                        </div>
                    </ModalBody>
                </form>
            </Modal>
            {/* gift modal  */}
            <GetMyDiscount
                closeStateCb={() => setModal(false)}
                viewState={modal}
                data={data}
            />
        </>
    );
};

export default CartModal;
