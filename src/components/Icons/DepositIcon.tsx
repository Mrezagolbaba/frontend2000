import { SVGProps } from "react";

const DepositIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90)"
      {...props}
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0" />
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g id="SVGRepo_iconCarrier">
        <path
          d="M13 11L21.2 2.80005"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
        <path
          d="M22 6.8V2H17.2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />{" "}
        <path
          d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};

export default DepositIcon;
