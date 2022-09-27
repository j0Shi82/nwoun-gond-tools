import { apiServer } from 'utils/imports/config';
import { axios } from 'utils/imports/core';

export default ({
  type, params = {}, returnData = true, nullCatch = false,
}) => {
  let requestUrl = null;
  const {
    page, tags, types, curPage, curDev, curID, itemDef, start, end,
  } = params;
  switch (type) {
    case 'articles/all':
      requestUrl = `${apiServer}/v1/articles/all?limit=100&page=${page}&tags=${tags}&types=${types}`;
      break;
    case 'devtracker/devlist':
      requestUrl = `${apiServer}/v1/devtracker/devlist`;
      break;
    case 'devtracker/topiclist':
      requestUrl = `${apiServer}/v1/devtracker/topiclist?threshold=5`;
      break;
    case 'devtracker/postlist':
      requestUrl = `${apiServer}/v1/devtracker/list?page=${curPage}&dev=${curDev}&discussion_id=${curID}`;
      break;
    case 'articles/dicussiontags':
      requestUrl = `${apiServer}/v1/articles/discussiontags`;
      break;
    case 'auctions/itemdetails':
      requestUrl = `${apiServer}/v1/auctions/itemdetails?item_def=${itemDef}&server=GLOBAL`;
      break;
    case 'auctions/items':
      requestUrl = `${apiServer}/v1/auctions/items?start=${start}&end=${end}`;
      break;
    case 'auctions/engine':
      requestUrl = `${apiServer}/v1/auctions/engine`;
      break;
    case 'auctions/patreon':
      requestUrl = `${apiServer}/v1/auctions/patreon`;
      break;
    default:
      requestUrl = null;
  }
  if (requestUrl == null) return Promise.reject(new Error('no valid request'));
  return axios.get(requestUrl)
    .then((response) => {
      if (returnData) return Promise.resolve(response.data);
      return Promise.resolve(response);
    })
    .catch((e) => {
      if (nullCatch) return Promise.resolve();
      return Promise.reject(e);
    });
};
