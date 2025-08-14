import { StatisticProps } from "./statistic.type";
import DeleteIcon from "@mui/icons-material/Delete";

export const Statistic = ({
  selectedDate,
  selectedAmount,
  paycheckStats,
  id,
  updateStats,
}: StatisticProps) => {
  function handleOnDelete() {
    if (!id) {
      console.error("No ID provided for deletion");
      return;
    }
    fetch(`/api/paychecks?id=${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Paycheck deleted successfully");
        } else {
          console.error("Error deleting paycheck");
        }
      })
      .catch((error) => {
        console.error("Error deleting paycheck:", error);
      });
    updateStats?.();
  }

  return (
    <div className="mt-10  rounded-xl p-4 shadow-lg">
      <div className="flex gap-2 justify-center items-center ">
        <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow ">
          Max tip amount:{" "}
          <span className="text-emerald-900 font-bold">
            MKD {paycheckStats?.max}
          </span>
        </p>
        <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow ">
          Min tip amount:{" "}
          <span className="text-emerald-900 font-bold">
            MKD {paycheckStats?.min}
          </span>
        </p>
      </div>
      <div className="flex flex-col gap-2 mt-4 ">
        <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow  mb-4">
          Total tip paid:{" "}
          <span className="text-emerald-900 font-bold">
            MKD {paycheckStats?.total}
          </span>
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
              Pay:{" "}
              <span className="text-emerald-900 font-bold">
                {`MKD ${selectedAmount}`}
              </span>
              {selectedAmount! > 0 && (
                <DeleteIcon
                  onClick={() => {
                    handleOnDelete();
                  }}
                />
              )}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
