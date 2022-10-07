import { makeApiCall } from 'utils/imports/helpers';
import { infohubWhoamiTagId, infohubWhoamiTagTitle } from 'utils/imports/store';

export default async (detail) => {
  let data = {
    id: null,
    name: null,
  };

  if (detail.params.length && detail.params[3]) {
    data = await makeApiCall({ type: 'infohub/whoami', params: { url: detail.params[3] }, nullCatch: true });
  }

  infohubWhoamiTagId.set(data?.id ?? null);
  infohubWhoamiTagTitle.set(data?.name ?? null);

  return true;
};
