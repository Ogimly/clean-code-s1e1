import Control from './common/control';
import TaskList from './TaskList';
import AddTask from './AddTask';

class TODO extends Control {
  constructor(parentNode, state) {
    super(parentNode, 'main', 'main-wrapper');

    this.sectionAdd = new AddTask(this.node, state, 'Add Item'); // <section> add tew task

    this.sectionIncomplete = new TaskList(this.node, state, false, 'Todo'); // <section> incomplete tasks

    this.sectionCompleted = new TaskList(this.node, state, true, 'Completed'); // <section> completed tasks

    const update = (appState) => {
      this.updateTaskLists(appState); // handler for event update data (emit in state.setData(data))
    };

    state.onChange.add(update); // add handler
  }

  updateTaskLists(state) {
    // destroy and add lists of tasks
    this.sectionIncomplete.destroy();
    this.sectionIncomplete = new TaskList(this.node, state, false, 'Todo');

    this.sectionCompleted.destroy();
    this.sectionCompleted = new TaskList(this.node, state, true, 'Completed');
  }
}

export default TODO;
