import Link from '../../helpers/Link';
import { FaArrowAltCircleRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const DoneComponent = ({reset}) => {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, []);
  return (
    <div className="p-2 lg:p-5 flex flex-col items-center justify-center">
      <div className="font-bold text-2xl">THANK YOU!</div>
      <div className="font-[500] text-lg text-center">
        Your order has been placed successfully
      </div>
      <div className="font-[500] text-gray-400 text-lg text-center">
        Our team will start working on it immediately
      </div>

      <Link className="flex justrify-start" href="/">
        <div
          className="mt-3 p-2 m-5 cursor-pointer flex items-center justify-center text-white w-full h-[80px] bg-red-600 rounded-full">
          SHOP MORE {process.env.NEXT_PUBLIC_CLEARANCE} OFFERS{' '}
          <FaArrowAltCircleRight
            className="ml-3"
            fill="white"
            size="30px"
            color={'transparent'}
          />
        </div>
      </Link>
      <Link onClick={() => reset()} className="cursor-pointer underline" href="/orders-list/all">
        show order list
      </Link>
    </div>
  );
};
export default DoneComponent;
