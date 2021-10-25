import FaIcon from 'svelte-awesome';

import MenuItem from 'components/content/menu/MenuItem.svelte';

import DevtrackerPost from 'components/content/devtracker/DevtrackerPost.svelte';

import InfohubArticles from 'components/content/infohub/InfohubArticles.svelte';
// import InfohubSourceModal from 'components/content/infohub/InfohubSourceModal.svelte';

import Button from 'components/ui/Button.svelte';
import Spinner from 'components/ui/Spinner.svelte';
import BackgroundOverlay from 'components/ui/BgOverlay.svelte';
import StandardError from 'components/ui/StandardError.svelte';

const Modal = () => import(/* webpackChunkName: "Modal" */ 'components/ui/Modal.svelte');
const InfohubSourceModal = () => import(/* webpackChunkName: "InfohubSourceModal" */ 'components/content/infohub/InfohubSourceModal.svelte');

export {
  MenuItem,
  Button,
  Spinner,
  DevtrackerPost,
  InfohubArticles,
  Modal,
  StandardError,
  InfohubSourceModal,
  BackgroundOverlay,
  FaIcon,
  FaIcon as FontAwesomeIcon,
  FaIcon as Icon,
};
