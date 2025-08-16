"use client";
import { Background } from "@/components/Background/Background";
import { Header } from "@/components/Header/Header";
import { Calendar } from "@/components/Calendar/Calendar";
import { useCallback, useEffect, useState } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Statistic } from "@/components/Statistic/Statistic";
import { PaycheckStats } from "./api/paychecks/stats/route";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import styled from "@emotion/styled";
export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(0);
  const [paycheckStats, setPaycheckStats] = useState<PaycheckStats | null>(
    null
  );
  const [id, setId] = useState<string | null>(null);
  const [view, setView] = useState<"TIP" | "SALARY">("TIP");

  const fetchPaycheckStats = useCallback(async (): Promise<void> => {
    const response = await fetch(`/api/paychecks/stats?view=${view}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      setPaycheckStats(data);
    } else {
      console.error("Error fetching paycheck stats");
    }
  }, [view]);

  useEffect(() => {
    fetchPaycheckStats();
  }, [id, fetchPaycheckStats]);

  function setDeleted() {
    setSelectedAmount(0);
    setId(null);
    fetchPaycheckStats();
  }

  async function handleOnDateChange(date: Date): Promise<void> {
    fetchPaycheckStats();
    setSelectedDate(date);

    const response = await fetch(
      `/api/paychecks?date=${date.toISOString()}&view=${view}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const jsonResponse = await response.json();
    const result = jsonResponse.result;
    console.log(result);

    if (result) {
      setSelectedAmount(result.amount);
      setId(result.id);
    } else {
      setSelectedAmount(0);
      setId(null);
    }
  }

  function handleOnUpdateStats(date: Date): void {
    if (!date) {
      console.error("No date selected for update");
      return;
    }
    fetchPaycheckStats();
    handleOnDateChange(date);
  }

  return (
    <Background>
      <div className="min-h-screen w-full flex flex-col">
        <div className="flex flex-col gap-5 justify-center">
          <Header />

          <Calendar
            onDateChange={(date) => handleOnDateChange(date!)}
            updateStats={(date) => handleOnUpdateStats(date)}
          />
        </div>
        <div className=" flex items-center justify-center gap-2 bg-dark-slate-gray  rounded-lg mt-2">
          <ToggleButtonGroup
            value={view}
            exclusive
            onChange={(_, newView) => {
              if (newView !== null) {
                setView(newView);
              }
            }}
          >
            <StyledToggleButton value="TIP" aria-label="tip">
              <CardGiftcardIcon />
            </StyledToggleButton>
            <StyledToggleButton value="SALARY" aria-label="salary">
              <PriceChangeIcon />
            </StyledToggleButton>
          </ToggleButtonGroup>
          <p className="font-oswald text-xl text-ivory-mist shadow-2xl drop-shadow-lg">
            Select View
          </p>
        </div>
        <Statistic
          selectedDate={selectedDate}
          selectedAmount={selectedAmount}
          updateStats={(date) => handleOnUpdateStats(new Date(date))}
          paycheckStats={paycheckStats}
          deletePay={() => setDeleted()}
          id={id}
          view={view}
        />
        <Footer />
      </div>
    </Background>
  );
}
const StyledToggleButton = styled(ToggleButton)({
  borderRadius: "8px",
  "&.Mui-selected": {
    color: "#fff",
  },
});
