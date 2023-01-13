import { useContext, useEffect, useState } from "react";
import * as C from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../context/CyclesContext";

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markyCurrentCycleAsFinished,
    amountSecondsPassed,
    setAmountSecondsPassed,
  } = useContext(CyclesContext);

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0;

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60;

  const minutes = String(minutesAmount).padStart(2, "0");
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    } else {
      document.title = "Ignite Timer";
    }
  }, [minutes, seconds]);

  useEffect(() => {
    let interval: number;
    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.startDate)
        );

        if (secondsDifference >= totalSeconds) {
          markyCurrentCycleAsFinished();
          setAmountSecondsPassed(totalSeconds);

          clearInterval(interval);
        } else {
          setAmountSecondsPassed(secondsDifference);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId]);

  return (
    <C.CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <C.Separator>:</C.Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </C.CountdownContainer>
  );
};
