import React from 'react';
import { Popover } from '@headlessui/react';
import Image from 'helpers/image';
import Link from 'helpers/Link';
import { useCart } from 'components/context/CartContext';
import Checkbox from 'components/base/Checkbox';

const CartProduct = ({ data, index, checkedCb }) => {
    const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();
    let [qty, setQty] = useState(data.qty);
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['S(6-8)', 'M(10)', 'L(12)', 'XL(14)', 'XXL(16)'];

    const incrementQty = () => {
        setQty(qty + 1);
        data.qty = qty + 1;
    };

    const decrementQty = () => {
        if (qty > 0) {
            setQty(qty - 1);
            data.qty = qty - 1;
        } else {
            alert('Quantity already 0');
        }
    };

    const handleQtyChange = (event) => {
        const newQty = parseInt(event.target.value);
        if (!isNaN(newQty)) {
            setQty(newQty);
            data.qty = newQty;
        }
    };

    return (
        <div className='flex justify-start items-center gap-x-3 max-w-[460px] px-4 mt-2'>
            <Checkbox
                identifier={data?.id}
                isChecked={data?.checked}
                onChangeCb={() => checkedCb()}
            />
            <div className='flex items-start space-x-3'>
                {/* image  */}
                <div className='w-[102px] h-[136px] relative'>
                    <Image src={data?.thumbnail} alt='' fill className='' />
                </div>
                {/* product-details details  */}
                <div className='flex flex-col justify-start gap-x-3'>
                    <div className='flex w-full justify-between items-center gap-3'>
                        <Link
                            href={'#'}
                            className='text-sm font-normal truncate text-left text-black-primary max-w-[245px]'
                        >
                            {data?.name}
                        </Link>
                        <button className='p-0' onClick={() => removeFromCart(index)}>
                            <i className='fa-regular fa-trash-can' />
                        </button>
                    </div>
                    <div className='flex justify-start items-center relative gap-2 my-2'>
                        <p className='text-base font-bold text-left text-black-primary'>
                            {data?.offer_price} AED
                        </p>
                        <p className='text-sm line-through text-left text-[#a1a5ab]'>
                            {data?.price} AED
                        </p>
                    </div>
                    <Popover className='relative'>
                        <Popover.Button className='px-2 py-1 rounded flex text-sm items-center space-x-1 text-[#484c52] bg-[#f2f2f3]'>
                            <span>Black,S</span>
                            <i className='fa-solid fa-chevron-down text-xs'></i>
                        </Popover.Button>
                        <Popover.Panel className='absolute z-10 bg-white p-2 -left-16 min-w-[320px] flex flex-col space-y-3'>
                            <div className='flex flex-col space-y-2'>
                                <span className='flex justify-start gap-2 capitalize text-black-primary font-medium mb-1'>
                                    color
                                </span>
                                <div className='h-7 w-7 flex justify-center items-center border border-black rounded-full bg-white'>
                                    <span className='h-[22px] w-[22px] rounded-full overflow-hidden relative'>
                                        <Image alt='' fill src={data?.img} />
                                    </span>
                                </div>
                            </div>

                            <div className='w-full flex flex-col justify-between items-start space-y-2'>
                                <div className='flex justify-start items-center gap-x-3'>
                                    <p className='text-black-primary capitalize font-medium'>
                                        size
                                    </p>
                                </div>
                                <div className='flex justify-start gap-2'>
                                    {tabs.map((tab, index) => (
                                        <div
                                            key={index}
                                            className={`border flex justify-center items-center border-solid p-1 min-w-[40px] rounded border-[#222] cursor-pointer text-sm leading-4 ${index === activeTab
                                                    ? 'bg-black-primary text-white'
                                                    : 'bg-white text-black-primary'
                                                }`}
                                            onClick={() => setActiveTab(index)}
                                        >
                                            {tab}
                                        </div>
                                    ))}
                                </div>
                                <hr className='border-[0.7px] border-ash w-full' />
                                <button className='bg-black-primary text-white w-full py-1 rounded'>
                                    submit
                                </button>
                            </div>
                        </Popover.Panel>
                    </Popover>
                    <div className='w-full flex items-center justify-between mt-2'>
                        <div className='flex items-center justify-between border rounded-[5px] divide-x'>
                            <button className='w-8' onClick={() => decreaseQuantity(index)}>
                                -
                            </button>
                            <input
                                className='bg-transparent w-9 text-center '
                                type='number'
                                value={data.qty}
                                onChange={handleQtyChange}
                            />
                            <button className='w-8' onClick={() => increaseQuantity(index)}>
                                +
                            </button>
                        </div>
                        <div>
                            Total:{' '}
                            <strong className='text-base leading-[18px]'>
                                {data?.offer_price
                                    ? (data?.offer_price * data.qty).toFixed(2)
                                    : (data?.price * data.qty).toFixed(2)}{' '}
                                AED
                            </strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
