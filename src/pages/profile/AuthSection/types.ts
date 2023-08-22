import { Dispatch, SetStateAction } from "react";

export interface AuthenticationLevel2Props {
  onClick: Dispatch<SetStateAction<1 | 2 | 3>>;
}
