import Image from "next/image";

export default function GoalProgressBar({ progress }) {

  return (
    <div className="relative w-full max-w-4xl mx-auto mb-8">
      <div className="relative h-4 bg-gray-200 rounded-full">
        {/* Barra llena */}
        <div
          className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
        {/* Hitos */}
        <div className="absolute w-full flex justify-between -top-3">
          {[0, 25, 50, 75, 100].map((milestone) => (
            <div
              key={milestone}
              className="relative flex flex-col items-center"
            >
              <Image
                src="/flag.svg"
                alt={`Hito ${milestone}`}
                width={24}
                height={24}
                className="z-10"
              />
              <span className="text-xs text-gray-700 mt-1">
                {milestone === 100 ? "Meta" : `${milestone * 40} Oro`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
