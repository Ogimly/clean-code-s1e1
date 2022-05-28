import Control from './common/control';
import TaskItem from './TaskItem';

class TaskList extends Control {
  constructor(parentNode, state, isCompleted, title) {
    super(parentNode, 'section');

    this.h3 = new Control(this.node, 'h3', 'title', title);
    this.ul = new Control(this.node, 'ul', 'task-list');
    if (isCompleted) this.node.classList.add('task-list_completed');
    this.ul.node.id = isCompleted ? 'completed-tasks' : 'incomplete-tasks';

    TaskList.LoadList(this.ul.node, state, isCompleted);
  }

  static LoadList(parentNode, state, isCompleted) {
    // filter for incomplete & completed tasks
    const data = Object.entries(state.data).filter((el) => el[1].isCompleted === isCompleted);

    data.forEach((el) => {
      const taskItem = new TaskItem(parentNode, state, el);

      taskItem.aaa = ''; // for eslint
    });
  }
}

export default TaskList;
