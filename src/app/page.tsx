"use client";
import { Background } from "@/components/Background/Background";
import { Header } from "@/components/Header/Header";
import { Calendar } from "@/components/Calendar/Calendar";
import { useEffect, useState } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Statistic } from "@/components/Statistic/Statistic";
import { PaycheckStats } from "./api/paychecks/stats/route";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(0);
  const [paycheckStats, setPaycheckStats] = useState<PaycheckStats | null>(
    null
  );
  const [id, setId] = useState<string | null>(null);
  function setDeleted() {
    setSelectedAmount(0);
    setId(null);
    fetchPaycheckStats();
  }
  async function fetchPaycheckStats(): Promise<void> {
    const response = await fetch(`/api/paychecks/stats`, {
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
  }

  useEffect(() => {
    fetchPaycheckStats();
  }, []);

  async function handleOnDateChange(date: Date): Promise<void> {
    fetchPaycheckStats();

    setSelectedDate(date);

    const response = await fetch(`/api/paychecks?date=${date.toISOString()}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonResponse = await response.json();
    const result = jsonResponse.result;

    if (result) {
      setSelectedAmount(result.amount);
      setId(result.id);
      return;
    }
    setSelectedAmount(0);
    setId(null);
  }

  function handleOnUpdateStats(date: Date): void {
    if (!date) {
      console.error("No date selected for update");
      return;
    }
    handleOnDateChange(date);
  }

  return (
    <Background>
      <div className="min-h-screen w-full flex flex-col">
        <div className="flex flex-col gap-5 justify-center">
          <Header />

          <Calendar
            onDateChange={(date) => handleOnDateChange(date!)}
            updateStats={() => fetchPaycheckStats()}
          />
        </div>
        <Statistic
          selectedDate={selectedDate}
          selectedAmount={selectedAmount}
          updateStats={(date) => handleOnUpdateStats(new Date(date))}
          paycheckStats={paycheckStats}
          deletePay={() => setDeleted()}
          id={id}
        />
        <Footer />
      </div>
    </Background>
  );
}
