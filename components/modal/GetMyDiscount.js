import React from 'react';
import Modal from 'components/base/Modal';
import ModalBody from 'components/common/ModalBody';
import Image from 'helpers/image';
import Button from 'components/base/Button';

const GetMyDiscount = ({ closeStateCb, viewState, data }) => {
    return (
        <Modal visible={viewState} closeCb={closeStateCb} title=''>
            <ModalBody modalBodyClass='flex text-center items-center flex-col gap-y-2 lg:gap-y-2.5 2xl:gap-y-3.5 !p-6 !w-[300px]'>
                <h3 className='text-xl lg:text-2xl 2xl:text-[30px] text-black-primary font-bold'>
                    Chance to Get This Item FREE
                </h3>
                <p className='text-xs lg:text-sm text-black-primary capitalize'>
                    just leave your email
                </p>
                <p className='text-lg xl:text-xl text-red-400 '>On your first order</p>
                <div className='w-[250px] h-[270px] relative overflow-hidden '>
                    <Image fill className='object-contain' alt='' src={data?.thumbnail} />
                </div>
                <input
                    type='email'
                    placeholder='Email Address'
                    required
                    className='w-full px-4 py-1.5 text-xs text-black-primary outline-0 border border-black-primary rounded bg-[#DEF7F8]'
                />
                <Button
                    actionCb={() => { }}
                    btnText='GET MY DISCOUNT'
                    variant='primary'
                    btnClass='hover:!opacity-90 !text-sm lg:!text-base 2xl:!text-lg !font-bold'
                />
            </ModalBody>
        </Modal>
    );
};

export default GetMyDiscount;
