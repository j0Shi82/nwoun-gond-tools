import { makeApiCall } from 'utils/imports/helpers';
import { infohubWhoamiTagId } from 'utils/imports/store';

export default async (detail) => {
  let tagId = null;

  if (detail.params.length && detail.params[3]) {
    tagId = await makeApiCall({ type: 'infohub/whoami', params: { url: detail.params[3] }, nullCatch: true });
  }

  infohubWhoamiTagId.set(tagId ?? null);

  return true;
};
