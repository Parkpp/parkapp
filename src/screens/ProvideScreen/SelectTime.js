import { View } from "react-native";

let timeList = [];
export const createTimeList = () => {
  let time;
  let i = 0;
  let min;
  let hour;
  while (i < 26) {
    if (i % 2 == 0) hour = i / 2;

    min = i % 2 == 0 ? "00" : "30";

    time = `${parseInt(hour)}:${min}:00`;

    if (i < 20) time = `0${time}`;

    timeList.push(time);
    if (i < 2) timeList.pop();

    i++;
  }

  return timeList;
};
