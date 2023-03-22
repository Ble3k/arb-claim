import { v4 as uuidV4 } from "uuid";

import wait from "./wait.js";
import { MAX_REQUEST_REPEAT_TIME } from "../config.js";

export const doRequestSafeRepeat = async ({ request, onFailedMessaged, unsafe, waitTimeMS }) => {
  const uniqId = uuidV4();
  const requestTryCount = {};

  const doRequest = async () => {
    try {
      requestTryCount[uniqId] = (requestTryCount[uniqId] || 0) + 1;
      return await request();
    } catch (e) {
      inspect(onFailedMessaged);
      inspect(`Current repeat try number is: ${requestTryCount[uniqId]}`);

      if (e?.message) {
        inspect(`Error message: ${e.message}`);
      } else {
        inspect(e);
      }

      if (!unsafe && requestTryCount[uniqId] < MAX_REQUEST_REPEAT_TIME) {
        inspect(`Waiting for next ${waitTimeMS / 1000} seconds to try again...`);
        await wait(waitTimeMS);
        return await doRequest();
      }
    }
  };

  return await doRequest();
};
