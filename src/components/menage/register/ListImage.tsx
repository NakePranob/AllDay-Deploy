'use client'
import { observer } from 'mobx-react';
import registerEntrepreneur from '@/stores/registerEntrepreneur';

import { MdDeleteOutline } from "react-icons/md";

function srcset(image: File, width: number, height: number, rows = 1, cols = 1) {
  const src = URL.createObjectURL(image);
  return {
    src: `${src}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${src}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

type Props = {}

const ListImage = observer((props: Props) => {
    return (
      <div className={`grid grid-cols-2 gap-1 relative ${registerEntrepreneur.imageList.length !== 0 && 'pb-8'}`}>
        { registerEntrepreneur.imageList.length !== 0 && registerEntrepreneur.imageList.map((item:any, i:number) => {
          const cols = i === 0 || i === 5 || i === 10 || i === 15 || i === 20 ? 2 : 1;
          return (
            <div className={`aspect-video col-span-${cols} rounded-sm w-full overflow-hidden relative`}>
              <img
                key={i}
                src={URL.createObjectURL(item.imgFile)}
                alt={item.imgFile.name}
                loading="lazy"
                className='w-full h-full object-cover object-center'
              />
              <span className='w-full h-full bg-black/50 opacity-0 hover:opacity-100 transition-300 
              flex-center absolute top-0 left-0'>
                <button onClick={() => registerEntrepreneur.removeImage(i)} className='text-2xl text-red-500 hover:bg-red-200/20 p-2 rounded-full hover:text-red-600 transition-300'>
                  <MdDeleteOutline/>
                </button>
              </span>
            </div>
          );
        })}
      </div>
    );
})

export default ListImage