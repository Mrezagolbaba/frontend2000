import { Dispatch, SetStateAction } from "react";

export interface AuthenticationLevel2Props {
  onClick: Dispatch<SetStateAction<0 | 1 | 2 | 3 | 4 | 5>>;
  allowStates?: any
}

export enum VERIFICATION_DOC_TYPE {
  SELFIE_VIDEO = "SELFIE_VIDEO",
  COMMITMENT_LETTER = "COMMITMENT_LETTER",
  RESIDENCE_PERMIT_FRONT = "RESIDENCE_PERMIT_FRONT",
  RESIDENCE_PERMIT_BACK = "RESIDENCE_PERMIT_BACK",
}

export const MAX_DOC_SIZE = 100000000;
