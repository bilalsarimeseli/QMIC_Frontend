import axios from "axios";

export const SUBSCRIBE_URL =  "/subscribe";

export function subscribe(meetingId, pin) {
  return axios.post(SUBSCRIBE_URL, { meetingId, pin });
}
