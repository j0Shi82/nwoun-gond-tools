import FaIcon from 'svelte-awesome';

import MenuItem from 'components/content/menu/MenuItem.svelte';

import DevtrackerPost from 'components/content/devtracker/DevtrackerPost.svelte';

import InfohubNews from 'components/content/infohub/InfohubNews.svelte';
import InfohubCat from 'components/content/infohub/InfohubCat.svelte';
// import InfohubSourceModal from 'components/content/infohub/InfohubSourceModal.svelte';

import Button from 'components/ui/Button.svelte';
import Spinner from 'components/ui/Spinner.svelte';
import BackgroundOverlay from 'components/ui/BgOverlay.svelte';
// import Modal from 'components/ui/Modal.svelte';

const Modal = () => import(/* webpackChunkName: "Modal" */ 'components/ui/Modal.svelte');
const InfohubSourceModal = () => import(/* webpackChunkName: "InfohubSourceModal" */ 'components/content/infohub/InfohubSourceModal.svelte');

export {
  MenuItem,
  Button,
  Spinner,
  DevtrackerPost,
  InfohubNews,
  InfohubCat,
  Modal,
  InfohubSourceModal,
  BackgroundOverlay,
  FaIcon,
  FaIcon as FontAwesomeIcon,
  FaIcon as Icon,
};
