import { useChoiseContext } from "../context/ChoiseContext";
import { useTaskContext } from "../context/TaskContext";

export const sort1 = () => {
  const { tasks } = useTaskContext();
  const { search } = useChoiseContext();
  return [...tasks]
    .sort((taskA, taskB) => (taskA.updatedAt > taskB.updatedAt ? -1 : 1))
    .filter((task) => task.title.toLowerCase().includes(search));
};

export const sort2 = () => {
  const { tasks } = useTaskContext();
  const { search } = useChoiseContext();
  return [...tasks]
    .sort((taskA, taskB) => (taskA.updatedAt > taskB.updatedAt ? 1 : -1))
    .filter((task) => task.title.toLowerCase().includes(search));
};

export const sort3 = () => {
  const { tasks } = useTaskContext();
  const { search } = useChoiseContext();
  return [...tasks]
    .sort((taskA, taskB) =>
      taskA.importance > taskB.importance
        ? -1
        : taskA.importance < taskB.importance
        ? 1
        : taskA.updatedAt > taskB.updatedAt
        ? -1
        : 1
    )
    .filter((task) => task.title.toLowerCase().includes(search));
};

export const sort4 = () => {
  const { tasks } = useTaskContext();
  const { search } = useChoiseContext();
  return [...tasks]
    .sort((taskA, taskB) =>
      taskA.importance > taskB.importance
        ? 1
        : taskA.importance < taskB.importance
        ? -1
        : taskA.updatedAt > taskB.updatedAt
        ? -1
        : 1
    )
    .filter((task) => task.title.toLowerCase().includes(search));
};

export const sort5 = () => {
  const { tasks } = useTaskContext();
  const { search } = useChoiseContext();
  return tasks
    .filter((task) => task.status == 1)
    .filter((task) => task.title.toLowerCase().includes(search));
};

export const sort6 = () => {
  const { tasks } = useTaskContext();
  const { search } = useChoiseContext();
  return tasks
    .filter((task) => task.status == 2)
    .filter((task) => task.title.toLowerCase().includes(search));
};

const useFunction = () => {
  const { select } = useChoiseContext();
  if (select == 1) {
    return sort1();
  } else if (select == 2) {
    return sort2();
  } else if (select == 3) {
    return sort3();
  } else if (select == 4) {
    return sort4();
  } else if (select == 5) {
    return sort5();
  } else if (select == 6) {
    return sort6();
  }
};

export default useFunction;
