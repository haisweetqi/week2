const converToMinutesAndSecond = (time: any) => {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;

  return `${minutes ? `${minutes} phút` : ""} ${
    seconds ? `${seconds} giây` : ""
  }`;
};

export default converToMinutesAndSecond;
