import { StatisticProps } from "./statistic.type";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { DialogComponent } from "../Dialog/Dialog";
import { useState } from "react";
import { Pay, PayType } from "@/types/pay.type";

export const Statistic = ({
  selectedDate,
  selectedAmount,
  paycheckStats,
  id,
  deletePay,
  updateStats,
  view,
}: StatisticProps) => {
  const [open, setOpen] = useState(false);
  const [paytype, setPaytype] = useState<PayType | null>(null);
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
    deletePay?.();
  }

  async function handleOnEdit() {
    setPaytype(null);
    if (id === null) {
      console.error("No ID provided for editing");
      return;
    }
    const response = await fetch(`/api/paychecks?id=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    const paytype: {
      amount: number;
      date: Date;
      payType: Pay;
      id: string;
    } = body.result;

    setPaytype({
      amount: paytype.amount,
      date: paytype.date,
      type: paytype.payType,
      id: paytype.id,
    });

    setOpen(true);
  }
  const mapView = {
    single: {
      TIP: "tip",
      SALARY: "salary",
    },
    plural: {
      TIP: "tips",
      SALARY: "salaries",
    },
  };
  return (
    <>
      <div className=" mt-2  rounded-xl p-4 shadow-lg">
        <div className="flex gap-2 justify-center items-center ">
          <p
            className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow grow
          sm:text-lg sm:px-2 sm:py-1
          flex flex-col justify-center
        "
          >
            Max {mapView.single[view]} amount: <br />
            <span className="text-emerald-900 font-bold">
              MKD {paycheckStats?.max}
            </span>
          </p>
          <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow grow">
            Min {mapView.single[view]} amount: <br />
            <span className="text-emerald-900 font-bold">
              MKD {paycheckStats?.min}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-1 mt-4 ">
          <p className="text-center font-oswald text-xl text-emerald-700 bg-white px-3 py-1 rounded-lg shadow  mb-4">
            Total {mapView.plural[view]} paid:{" "}
            <span className="text-emerald-900 font-bold">
              MKD {paycheckStats?.total}
            </span>
          </p>
          {selectedDate && (
            <div className=" flex flex-col gap-2">
              <p className="text-center font-oswald text-xl text-emerald-800 bg-white px-3 py-1 rounded-lg shadow"></p>
              <p className="text-center font-oswald text-xl text-emerald-800 bg-white px-3 py-1 rounded-lg shadow ">
                <span className="text-emerald-900 font-semibold">
                  {selectedDate.toLocaleDateString()}
                </span>
                {" \t "}
                <span className="text-emerald-900 font-semibold">-- </span>
                <span className="text-emerald-900 font-bold">
                  {`MKD ${selectedAmount}`}
                </span>
                {selectedAmount! > 0 && (
                  <>
                    <span className=" inline-block pr-2">
                      <DeleteIcon
                        className=" cursor-pointer text-emerald-900 focus:text-red-600 relative bottom-0.5"
                        onClick={() => {
                          handleOnDelete();
                        }}
                      />
                    </span>
                    <EditIcon
                      className=" cursor-pointer text-emerald-900 focus:text-blue-600 relative bottom-0.5"
                      onClick={() => {
                        handleOnEdit();
                      }}
                    />
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>

      <DialogComponent
        open={open}
        onClose={() => setOpen(false)}
        paytype={paytype}
        updateStats={updateStats}
      />
    </>
  );
};
