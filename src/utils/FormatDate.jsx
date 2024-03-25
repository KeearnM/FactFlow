import React from "react";

const FormatDate = ({ updatedAt }) => {
  // Calculate the time difference
  const updatedAtDate = new Date(updatedAt);
  const currentDate = new Date();
  const timeDifference = currentDate - updatedAtDate;

  // Convert time difference to hours
  const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));

  // Format the updatedAt string
  let updatedAtString = "";
  if (hoursDifference < 1) {
    updatedAtString = "less than an hour ago";
  } else if (hoursDifference === 1) {
    updatedAtString = "1h ago";
  } else if (hoursDifference > 1 && hoursDifference < 24) {
    updatedAtString = `${hoursDifference}h ago`;
  } else if (hoursDifference > 24 && hoursDifference < 240) {
    const daysDifference = hoursDifference / 24;
    updatedAtString = `${daysDifference} days ago`;
  } else {
    // Format the date in "Mar 23, 2024 ∙ 4:31PM" format like
    const dateFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const timeFormatOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedDate = updatedAtDate.toLocaleDateString(
      "en-US",
      dateFormatOptions
    );
    const formattedTime = updatedAtDate.toLocaleTimeString(
      "en-US",
      timeFormatOptions
    );

    updatedAtString = `${formattedDate} ${formattedTime}`;
  }
  return <span>{updatedAtString}</span>;
};

export default FormatDate;
