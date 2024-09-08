'use client'

type Props = {
  percentage: number
}

const Loader = ({ percentage }: Props) => {
  return (
    <div className="flex justify-center items-center">
      <div className="relative flex justify-center items-center w-24 h-24">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100">
          {/* วงกลมด้านหลัง */}
          <circle
            className="text-gray-300 dark:text-gray-700"
            strokeWidth="12"
            stroke="currentColor"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
          />
          {/* วงกลมที่เป็นแถบโหลด */}
          <circle
            className="text-black dark:text-white"
            strokeWidth="12"
            strokeDasharray="276"
            strokeDashoffset={`${276 - (276 * percentage) / 100}`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r="44"
            cx="50"
            cy="50"
            transform="rotate(-90 50 50)" // หมุนจุดเริ่มต้นไปที่ 12 นาฬิกา (ด้านบน)
          />
        </svg>
        <span className="text-xl font-semibold">{percentage}%</span>
      </div>
    </div>
  );
};

export default Loader;
