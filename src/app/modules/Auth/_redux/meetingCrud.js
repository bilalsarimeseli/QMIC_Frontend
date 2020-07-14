import axios from "axios";

export const CREATE_MEETING =  "/create_meeting";

export function crateMeeting(meeting_start_time, description, credentials) {
  return axios.post(CREATE_MEETING, {meeting_start_time, description, credentials});
}

