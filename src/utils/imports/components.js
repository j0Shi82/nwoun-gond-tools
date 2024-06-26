import FaIcon from "svelte-awesome";

import MenuItem from "@/components/content/menu/MenuItem.svelte";

import DevtrackerPost from "@/components/content/devtracker/DevtrackerPost.svelte";

import InfohubArticles from "@/components/content/infohub/InfohubArticles.svelte";
// import InfohubSourceModal from 'components/content/infohub/InfohubSourceModal.svelte';

import AuctionDataEngineInfo from "@/components/content/auction/AuctionDataEngineInfo.svelte";
import AuctionDataSearchCatSelect from "@/components/content/auction/AuctionDataSearchCatSelect.svelte";
import AuctionDataSearchDatePicker from "@/components/content/auction/AuctionDataSearchDatePicker.svelte";
import AuctionDataSearchQualitySelect from "@/components/content/auction/AuctionDataSearchQualitySelect.svelte";

import BackgroundOverlay from "@/components/ui/BgOverlay.svelte";
import Button from "@/components/ui/Button.svelte";
import Spinner from "@/components/ui/Spinner.svelte";
import StandardError from "@/components/ui/StandardError.svelte";

const Modal = () =>
    import(/* webpackChunkName: "Modal" */ "@/components/ui/Modal.svelte");
const InfohubSourceModal = () =>
    import(
        /* webpackChunkName: "InfohubSourceModal" */ "@/components/content/infohub/InfohubSourceModal.svelte"
    );

export {
    AuctionDataEngineInfo,
    AuctionDataSearchCatSelect,
    AuctionDataSearchDatePicker,
    AuctionDataSearchQualitySelect,
    BackgroundOverlay,
    Button,
    DevtrackerPost,
    FaIcon,
    FaIcon as FontAwesomeIcon,
    FaIcon as Icon,
    InfohubArticles,
    InfohubSourceModal,
    MenuItem,
    Modal,
    Spinner,
    StandardError,
};
