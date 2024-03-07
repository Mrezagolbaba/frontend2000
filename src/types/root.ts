// types
import { AuthProps } from './auth';

// ==============================|| ROOT TYPES  ||============================== //

export type RootStateProps = {
  auth: AuthProps;
};

export type KeyedObject = {
  [key: string]: string | number | KeyedObject | any;
};

