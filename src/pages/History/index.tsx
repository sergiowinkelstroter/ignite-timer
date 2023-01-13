import * as C from "./styles";

import { CyclesContext } from "../../context/CyclesContext";
import { formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useContext } from "react";

export const History = () => {
  const { cycles } = useContext(CyclesContext);

  return (
    <C.HistoryContainer>
      <h1>Meu histórico</h1>

      <C.HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} minutos</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <C.Status statusColor="green">Concluido</C.Status>
                    )}
                    {cycle.interruptedDate && (
                      <C.Status statusColor="red">Interrompido</C.Status>
                    )}
                    {!cycle.finishedDate && !cycle.interruptedDate && (
                      <C.Status statusColor="yellow">Em andamento</C.Status>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </C.HistoryList>
    </C.HistoryContainer>
  );
};
