import { apiServer } from "utils/imports/config";

import axios from "axios";

export default ({
    type,
    params = {},
    method = "get",
    timeout = 5000,
    returnData = true,
    nullCatch = false,
}) => {
    let requestUrl = null;
    const {
        page,
        tags,
        types,
        sites,
        curPage,
        curDev,
        curID,
        itemDef,
        start,
        end,
        url,
    } = params;
    switch (type) {
        case "articles/all":
            requestUrl = `${apiServer}/v1/articles/all?limit=100&page=${page}&tags=${tags}&types=${types}&sites=${sites}`;
            break;
        case "devtracker/devlist":
            requestUrl = `${apiServer}/v1/devtracker/devlist`;
            break;
        case "devtracker/devinfo":
            requestUrl = `${apiServer}/v1/devtracker/devinfo?dev=${curDev}&id=${curID}`;
            break;
        case "devtracker/topiclist":
            requestUrl = `${apiServer}/v1/devtracker/topiclist?threshold=5`;
            break;
        case "devtracker/postlist":
            requestUrl = `${apiServer}/v1/devtracker/list?page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
            break;
        case "articles/dicussiontags":
            requestUrl = `${apiServer}/v1/articles/discussiontags`;
            break;
        case "infohub/whoami":
            requestUrl = `${apiServer}/v1/infohub/whoami?url=${url}`;
            break;
        case "infohub/source":
            requestUrl = `${apiServer}/v1/infohub/source`;
            break;
        case "auctions/itemdetails":
            requestUrl = `${apiServer}/v1/auctions/itemdetails?item_def=${itemDef}&server=GLOBAL`;
            break;
        case "auctions/items":
            requestUrl = `${apiServer}/v1/auctions/items?start=${start}&end=${end}`;
            break;
        case "auctions/engine":
            requestUrl = `${apiServer}/v1/auctions/engine`;
            break;
        case "auctions/patreon":
            requestUrl = `${apiServer}/v1/auctions/patreon`;
            break;
        default:
            requestUrl = null;
    }
    if (requestUrl == null) {
        return Promise.reject(new Error("no valid request"));
    }

    return axios({
        method,
        url: requestUrl,
        timeout,
        data: method === "post" ? params : {},
    })
        .then((response) => {
            if (returnData) return Promise.resolve(response.data);
            return Promise.resolve(response);
        })
        .catch((e) => {
            if (nullCatch) return Promise.resolve();
            return Promise.reject(e);
        });
};
