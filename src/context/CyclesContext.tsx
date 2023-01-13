import {
  ReactNode,
  createContext,
  useState,
  useReducer,
  useEffect,
} from "react";
import { Cycle, CyclesState, cyclesReducer } from "../reducers/cycles/reducer";
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface NewCycleData {
  task: string;
  minutesAmount: number;
}

interface CyclesProviderProps {
  children: ReactNode;
}

interface CyclesContextType {
  cycles: Cycle[];
  activeCycle: Cycle | undefined;
  activeCycleId: string | null;
  markyCurrentCycleAsFinished: () => void;
  interruptCicly: () => void;
  createNewCycle: (data: NewCycleData) => void;
  amountSecondsPassed: number;
  setAmountSecondsPassed: React.Dispatch<React.SetStateAction<number>>;
}

export const CyclesContext = createContext({} as CyclesContextType);

const initialValue: CyclesState = { cycles: [], activeCycleId: null };

function init(initialValue: CyclesState) {
  const storedStateAsJSON = localStorage.getItem(
    "@ignite-timer:cycles-state-1.0.0"
  );
  if (storedStateAsJSON) {
    return JSON.parse(storedStateAsJSON);
  } else {
    return initialValue;
  }
}

export const CyclesProvider = ({ children }: CyclesProviderProps) => {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, initialValue, init);

  const { cycles, activeCycleId } = cyclesState;
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

  const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate));
    }

    return 0;
  });

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState);
    if (cyclesState.cycles.length !== 0) {
      localStorage.setItem("@ignite-timer:cycles-state-1.0.0", stateJSON);
    }
  }, [cyclesState]);

  function markyCurrentCycleAsFinished() {
    dispatch(markCurrentCycleAsFinishedAction());
  }

  function createNewCycle(data: NewCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    };

    dispatch(addNewCycleAction(newCycle));

    setAmountSecondsPassed(0);
  }

  function interruptCicly() {
    dispatch(interruptCurrentCycleAction());
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markyCurrentCycleAsFinished,
        interruptCicly,
        createNewCycle,
        amountSecondsPassed,
        setAmountSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  );
};
