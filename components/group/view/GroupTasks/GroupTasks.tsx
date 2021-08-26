import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { BiListPlus } from 'react-icons/bi';

import { useTranslation } from 'lib/i18n';
import { useGroupTasksQuery } from 'lib/graphql';
import { GroupContext } from 'context/group';
import { useTaskManagement } from 'hooks/task';
import { getPaginationProps } from 'util/graphql';
import { getInternalPath } from 'util/url';
import { GroupWindow } from 'components/group/misc';
import { GroupEntityCreateButton } from 'components/group/control';
import { TaskList } from 'components/common/control';

/** Renders an overview of the group tasks. Meant to be used within a group context. */
export const GroupTasks: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { groupId } = useContext(GroupContext);
  const [composing, setComposing] = useState(false);
  const { createTask, toggleTask } = useTaskManagement(groupId);
  const { loading, data, fetchMore } = useGroupTasksQuery({
    notifyOnNetworkStatusChange: true,
    variables: { id: groupId },
  });

  const tasks = data?.group?.managesTask.edges.map((edge) => edge.node) || [];

  const handleCreateClick = () => setComposing(true);

  const handleTaskCreate = async (title: string, hideInput?: boolean) => {
    if (title) await createTask(title);
    if (hideInput) setComposing(false);
  };

  const handleTaskToggle = async (complete: boolean, id: string) => {
    await toggleTask(complete, id);
  };

  const handleTaskClick = (id: string) => {
    router.push(getInternalPath(groupId, `/tasks/${id.split(':')[1]}`));
  };

  return (
    <GroupWindow
      title={t('group:tool.tasks.title')}
      footer={
        composing ? null : (
          <GroupEntityCreateButton
            icon={BiListPlus}
            label={t('action.addTask')}
            onClick={handleCreateClick}
          />
        )
      }
      bottomGutter={composing ? 0 : 11}
      noPadding
    >
      <TaskList
        items={tasks}
        pagination={getPaginationProps(data?.group?.managesTask, {
          loading,
          fetchMore,
        })}
        showInput={composing}
        onCreate={handleTaskCreate}
        onToggle={handleTaskToggle}
        onClick={handleTaskClick}
      />
    </GroupWindow>
  );
};
