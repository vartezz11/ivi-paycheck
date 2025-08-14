"use client";
import { Background } from "@/components/Background/Background";
import { Header } from "@/components/Header/Header";
import { Calendar } from "@/components/Calendar/Calendar";
import { useState } from "react";
import { Footer } from "@/components/Footer/Footer";
import { Statistic } from "@/components/Statistic/Statistic";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  function handleOnDateChange(date: Date): void {
    setSelectedDate(date);
    console.log(date);
  }

  return (
    <Background>
      <div className="min-h-screen w-full flex flex-col">
        <div className="flex flex-col gap-10 justify-center">
          <Header />

          <Calendar onDateChange={(date) => handleOnDateChange(date!)} />
        </div>
        <Statistic selectedDate={selectedDate} />
        <Footer />
      </div>
    </Background>
  );
}
