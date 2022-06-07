import Control from './common/control';

class TaskItem extends Control {
  constructor(parentNode, state, el) {
    super(parentNode, 'li', 'task task-list__task');

    // el: key (el[0]) - id of task, value (el[1]) - task obj { isCompleted: boolean, isEdit: boolean, task: string }
    const id = el[0];
    const taskObj = el[1];
    const { isCompleted, isEdit, task } = taskObj;

    if (isEdit) this.node.classList.add('task-list__task_edit');

    this.state = state; // state for update
    this.id = id; // id of task obj

    // add elements and handlers in DOM
    this.cbCompleted = TaskItem.addCheckBox(this.node, isCompleted);
    this.cbCompleted.node.onchange = () => {
      this.moveTask();
    };

    this.lblTask = new Control(this.node, 'label', 'label task__label', task);
    this.lblTask.node.onclick = () => {
      this.editTask();
    };

    this.inputTask = new Control(this.node, 'input', 'input-text task__input-text');
    this.inputTask.node.value = task;
    this.inputTask.node.onchange = () => {
      this.editTask();
    };

    this.btnEdit = TaskItem.addBtnEdit(this.node, isEdit);
    this.btnEdit.node.onclick = () => {
      this.editTask();
    };

    this.btnRemove = TaskItem.addBtnRemove(this.node);
    this.btnRemove.node.onclick = () => {
      this.deleteTask();
    };
  }

  static addCheckBox(parentNode, value) {
    const cb = new Control(parentNode, 'input', 'input-checkbox task__input-checkbox');
    cb.node.type = 'checkbox';
    cb.node.checked = value;
    return cb;
  }

  static addBtnEdit(parentNode, isEdit) {
    const btn = new Control(parentNode, 'button');
    btn.node.innerHTML = isEdit ? 'Save' : 'Edit';
    btn.node.className = 'button task__button task__button_edit';
    return btn;
  }

  static addBtnRemove(parentNode) {
    const btn = new Control(parentNode, 'button', 'button task__button task__button_delete');

    const img = document.createElement('img');
    img.className = 'button__img';
    img.alt = 'remove task';
    img.src = './remove.svg';
    btn.node.append(img);

    return btn;
  }

  getId() {
    return this.id;
  }

  moveTask() {
    const { state } = this;
    // change flag incomplete/completed in state.data and emit update in state.setData(data)
    state.data[this.id].isCompleted = !state.data[this.id].isCompleted;
    state.setData(state.data);
  }

  editTask() {
    const { state } = this;

    // change flag edit/save in state.data and emit update in state.setData(data)
    const isEdit = !state.data[this.id].isEdit;
    state.data[this.id].isEdit = isEdit;

    let task = '';
    if (isEdit) task = this.lblTask.node.innerHTML;
    else task = this.inputTask.node.value;
    // change task text in state.data and emit update in state.setData(data)
    state.data[this.id].task = task;

    state.setData(state.data);
  }

  deleteTask() {
    const { state } = this;
    // del task in state.data and emit update in state.setData(data)
    delete state.data[this.id];
    state.setData(state.data);
  }
}

export default TaskItem;
