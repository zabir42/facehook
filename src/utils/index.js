export const getDateDifferenceFromNow = (fromDate) => {
  const differenceInMillis =
    new Date().getTime() - new Date(fromDate).getTime();
  const differenceInSeconds = differenceInMillis / 1000;

  if (differenceInSeconds < 60) {
    return "Just now";
  }

  const minutes = Math.floor(differenceInSeconds / 60);
  const hours = Math.floor(differenceInSeconds / 3600);
  const days = Math.floor(differenceInSeconds / 86400);

  if (days > 0) {
    return `${days} ${days === 1 ? "day" : "days"} ago`;
  } else if (hours > 0) {
    return `${hours} ${hours === 1 ? "hour" : "hours"} ago`;
  } else {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"} ago`;
  }
};
