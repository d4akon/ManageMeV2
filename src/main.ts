import AddButton from './components/addButton';
import Container from './components/container';
import HeaderLabel from './components/headerLabel';
import Modal from './components/modal';

// @ts-ignore: Unused parameter
const headerContainer = new Container('header-container', 'app');

// @ts-ignore: Unused parameter
const contentContainer = new Container('content-container', 'app');

// @ts-ignore: Unused parameter
const modal = new Modal('add-form-modal', 'content-container');

// @ts-ignore: Unused parameter
const headerLabel = new HeaderLabel(
  'Manage me',
  'title-header',
  'header-container'
);

const test = document.createElement('h1');
test.innerText = 'TEST';

modal.setContent(test);

const handleClick = (): void => {
  modal.open();
};

// @ts-ignore: Unused parameter
const addButton = new AddButton(
  'Add new project',
  'add-project-btn',
  'content-container',
  handleClick
);
