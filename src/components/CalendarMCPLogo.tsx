import { CSSProperties } from "react";

export const CalendarMCPLogo = (props: {
  className?: string;
  style?: CSSProperties;
}) => {
  const totalLines = 25;
  const stripeHeight = 15 / totalLines;

  return (
    <svg
      className={props.className}
      style={props.style}
      width={15}
      height={15}
      viewBox="0 0 15 15"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="stripes"
          width="15"
          height={stripeHeight * 2}
          patternUnits="userSpaceOnUse"
        >
          <rect y="0" width="15" height={stripeHeight} fill="black" />
          <rect
            y={stripeHeight}
            width="15"
            height={stripeHeight}
            fill="white"
          />
        </pattern>

        <mask id="circle-mask">
          <rect width="15" height="15" fill="black" />
          <circle cx="7.5" cy="7.5" r="7.5" fill="white" />
          <circle cx="7.5" cy="7.5" r="4" fill="black" />
          <rect x="7.5" y="5.9" width="7.5" height="3.2" fill="black" />
        </mask>
      </defs>

      <rect
        width="15"
        height="15"
        fill="url(#stripes)"
        mask="url(#circle-mask)"
      />
    </svg>
  );
};