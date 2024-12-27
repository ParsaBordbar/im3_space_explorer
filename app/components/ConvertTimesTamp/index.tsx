// Example Component: ConvertTimestamp.tsx
import React from "react";

const ConvertTimestamp = ({
  time,
  className,
}: {
  time: number | string;
  className?: string;
}) => {
  const timestamp = time; // Unix timestamp
  var formattedDate;
  if (typeof timestamp == "number") {
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert seconds to milliseconds
    formattedDate = date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      second: "2-digit",
    });
  } else {
    const date = new Date("2024-12-18T18:45:03.150Z");
    formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "medium",
    }).format(date);
  }
  return (
    <p className={`${className} text-white font-SpaceGrotesk text-base`}>
      {formattedDate}
    </p>
  );
};

export default ConvertTimestamp;
