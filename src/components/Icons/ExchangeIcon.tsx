import { SVGProps } from "react";

const ExchangeIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g id="bgCarrier" strokeWidth="0" />
      <g id="tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
      <g id="iconCarrier">
        <path
          d="M20.5 14.99L15.49 20.01"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 14.99H20.5"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M3.5 9.00999L8.51 3.98999"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5 9.01001H3.5"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default ExchangeIcon;
