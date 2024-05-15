import { SVGProps } from "react";

const SquareInfo = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" {...props}>
      <path d="M64 64C46.3 64 32 78.3 32 96V416c0 17.7 14.3 32 32 32H384c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32H64zM0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm200 64a24 24 0 1 1 48 0 24 24 0 1 1 -48 0zm-16 64h40c8.8 0 16 7.2 16 16V352h32c8.8 0 16 7.2 16 16s-7.2 16-16 16H176c-8.8 0-16-7.2-16-16s7.2-16 16-16h32V256H184c-8.8 0-16-7.2-16-16s7.2-16 16-16z" />
    </svg>
  );
};

export default SquareInfo;
