import { StatisticProps } from "./statistic.type";

export const Statistic = ({ selectedDate }: StatisticProps) => {
  return (
    <div className="mt-10  rounded-xl p-4 shadow-lg">
      <div className="flex gap-2 justify-center items-center ">
        <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow ">
          Max tip amount:{" "}
          <span className="text-emerald-900 font-bold">$10000000</span>
        </p>
        <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow ">
          Min tip amount:{" "}
          <span className="text-emerald-900 font-bold">$10</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-4 ">
        <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow  mb-4">
          Total tip paid:{" "}
          <span className="text-emerald-900 font-bold">$20000</span>
        </p>
        {selectedDate && (
          <>
            <p className="text-center font-oswald text-xl text-emerald-800 bg-white px-3 py-1 rounded-lg shadow">
              Paycheck date:{" "}
              <span className="text-emerald-900 font-semibold">
                {selectedDate.toLocaleDateString()}
              </span>
            </p>
            <p className="text-center font-oswald text-xl text-emerald-800 bg-white px-3 py-1 rounded-lg shadow">
              Pay: <span className="text-emerald-900 font-bold">$100</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};
