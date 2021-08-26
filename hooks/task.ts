import dayjs from 'dayjs';

import { TaskFormData } from 'types';
import {
  TaskFragment,
  TaskFragmentDoc,
  useTaskCreateMutation,
  useTaskModifyMutation,
} from 'lib/graphql';
import { addToConnectionStore } from 'util/cache';

/** Returns helpers for creating tasks or updating the completed status via GraphQL. */
export const useTaskManagement = (groupId: string) => {
  const [createTask] = useTaskCreateMutation();
  const [modifyTask] = useTaskModifyMutation();

  const createNewTask = async (title: string) => {
    const { data: createResult } = await createTask({
      variables: { group: groupId, title },
      update: (cache, { data }) => {
        cache.modify({
          id: groupId,
          fields: {
            managesTask: addToConnectionStore(
              cache.writeFragment({
                fragment: TaskFragmentDoc,
                fragmentName: 'Task',
                data: data?.taskCreate,
              }),
              'TaskEdge',
              true
            ),
          },
        });
      },
    });

    const newTaskId = createResult?.taskCreate.id;
    if (!newTaskId) throw new Error('Missing mutation response');

    return newTaskId;
  };

  const toggleTask = async (completed: boolean, id: string) => {
    const modifyResult = await modifyTask({
      variables: { task: id, completed },
      update: (cache, { data }) => {
        cache.modify({
          id: groupId,
          fields: {
            managesTask: ({
              edges,
              ...otherData
            }: {
              edges: { node: { __ref: string } }[];
            }) => {
              const modifiedTask = data?.taskModify;
              if (!modifiedTask) throw new Error('Missing mutation response');

              const newEdges: typeof edges = [];
              const modifiedTaskEdge = { node: { __ref: modifiedTask.id } };
              let alreadyInserted = false;

              edges.forEach((currentEdge) => {
                // Ignore the old reference to the modified task.
                if (currentEdge.node.__ref === modifiedTask.id) return null;

                const taskDataFromCurrentEdge =
                  cache.readFragment<TaskFragment>({
                    fragment: TaskFragmentDoc,
                    id: currentEdge.node.__ref,
                  });

                // Skip dangling references.
                if (!taskDataFromCurrentEdge) return;

                if (!alreadyInserted) {
                  if (completed) {
                    // Insert a completed task in front of any other completed tasks.
                    if (taskDataFromCurrentEdge.completed) {
                      newEdges.push(modifiedTaskEdge);
                      alreadyInserted = true;
                    }
                  } else {
                    // Insert an open task in front of an older open task.
                    if (
                      !taskDataFromCurrentEdge.completed &&
                      dayjs(taskDataFromCurrentEdge.createdAt).isBefore(
                        modifiedTask.createdAt
                      )
                    ) {
                      newEdges.push(modifiedTaskEdge);
                      alreadyInserted = true;
                    }
                  }
                }

                // Insert the previous edge on the same position as before.
                newEdges.push(currentEdge);
              });

              // If we could not determine the right position yet, just add it to the bottom.
              if (!alreadyInserted) newEdges.push(modifiedTaskEdge);

              return {
                edges: newEdges,
                ...otherData,
              };
            },
          },
        });
      },
    });

    return modifyResult.data?.taskModify.completedAt;
  };

  return { createTask: createNewTask, toggleTask };
};

/** Returns a function to create a new task via GraphQL. */
export const useTaskSubmit = (taskId: string) => {
  const [modifyTask] = useTaskModifyMutation();

  const modifyExistingTask = async (data: TaskFormData) => {
    await modifyTask({
      variables: {
        task: taskId,
        title: data.title,
        completed: data.completed,
      },
    });
  };

  return modifyExistingTask;
};
