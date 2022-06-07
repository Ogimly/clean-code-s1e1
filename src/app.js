import TODO from './scripts/TODO';
import Signal from './scripts/common/signal';

// class AppState - state of application
class AppState {
  constructor(data) {
    // data is obj: key - id of task, value - task obj { isCompleted: boolean, isEdit: boolean, task: string }
    this.data = data;
    // currentId - next id for task obj
    this.currentId = this.getMaxId() + 1;
    // onChange - listener for event on change data
    this.onChange = new Signal();
  }

  getMaxId() {
    return Math.max(...Object.keys(this.data));
  }

  upCurrentId() {
    this.currentId += 1;
  }

  getData() {
    return this.data;
  }

  setData(data) {
    this.data = data;
    this.onChange.emit(this); // emit event for update data

    this.saveData(); // to local storage
  }

  saveData() {
    localStorage.setItem('savedTaskList', JSON.stringify(this.data));
  }
}

const loadData = () => {
  const defaultData = {
    0: { isCompleted: false, isEdit: false, task: 'Pay Bills' },
    1: { isCompleted: false, isEdit: true, task: 'Go Shopping' },
    2: { isCompleted: true, isEdit: false, task: 'See the Doctor' },
  };

  let data = '';
  try {
    data = JSON.parse(localStorage.getItem('savedTaskList'));
  } catch {
    data = defaultData;
  }

  if (data === null || !(typeof data === 'object')) data = defaultData;

  return data;
};

window.onload = () => {
  const data = loadData(); // from local storage
  const state = new AppState(data);

  const app = new TODO(document.body, state); // <main>
  app.aaa = ''; // for eslint
};
