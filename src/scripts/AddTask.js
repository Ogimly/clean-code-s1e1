import Control from './common/control';

class AddTask extends Control {
  constructor(parentNode, state, title) {
    super(parentNode, 'section');

    this.state = state; // state for update

    // add elements and handlers in DOM
    this.h3 = new Control(this.node, 'h3', 'title', title);
    this.div = new Control(this.node, 'div', 'task task-new');

    this.inputTask = new Control(this.div.node, 'input', 'input-text task__input-text');
    this.inputTask.node.onchange = () => {
      this.addTask();
    };

    this.btnAdd = new Control(this.div.node, 'button', 'button task__button task__button_add', 'Add');
    this.btnAdd.node.onclick = () => {
      this.addTask();
    };
  }

  addTask() {
    const newTask = this.inputTask.node.value;

    const { state } = this;
    // add new task in state.data and emit update in state.setData(data)
    state.data[state.currentId] = { isCompleted: false, isEdit: false, task: newTask };
    state.setData(state.data);
    state.upCurrentId();

    this.inputTask.node.value = '';
  }
}

export default AddTask;
