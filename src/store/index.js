import appStore from "store/app/index";
import { storeTypeWritable } from "utils/imports/svelte";

export default {
    app: appStore,
    devtracker: {
        avatars: storeTypeWritable({}),
    },
    infohub: {
        firstloadError: storeTypeWritable(false),
        tagId: storeTypeWritable(null),
        tagTitle: storeTypeWritable(""),
        tags: storeTypeWritable([]),
    },
    user: {},
};
