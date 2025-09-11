/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BigNumberJS from 'bignumber.js';
import { ReactNode } from 'react';
// import { Keplr, Window as KeplrWindow } from '@keplr-wallet/types';

declare global {
  interface Window {
    eth_owallet: any;
    phantom: any;
  }

  interface ImportMetaEnv {
    readonly VITE_APP_ENV: 'dev' | 'product' | 'staging';
    // more env variables...
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
export type TypeElementArr<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<infer TypeElementArr> ? TypeElementArr : never;
export type ArgumentTypes<F extends Function> = F extends (...args: infer A) => any ? A : never;

export type AnchorElType = null | Element | ((_element: Element) => Element);

export interface FormatNumberOptions {
  /**
   * Number of digits after the decimal point. Must be in the range 0 - 20, inclusive.
   */
  fractionDigits?: number;
  /**
   * A fallback react tree to show when a number is invalid.
   * @default `---`
   */
  fallback?: ReactNode;
  /**
   * The string used to separate number.
   */
  delimiter?: string;
  /**
   * Allow zero after decimal point.
   * @default false
   */
  padZero?: boolean;
  /**
   * A string that will be appended to the beginning of the returned result.
   */
  prefix?: string;
  /**
   * A string that will be appended to the ending of the returned result.
   */
  suffix?: string;
  /**
   * return 0 if number < 0
   */
  onlyPositive?: boolean;
}

export interface ReducerAction<T, P> {
  type: T;
  payload: P;
}

export type BigNumberish = BigNumberJS.Value;

export interface BaseContextProps {
  children: ReactNode;
}

export type TStatusFetchData = 'init' | 'success' | 'failure' | 'updating' | 'fetching';

export const Unknown = 'Unknown';

export const Env = import.meta.env;

export type HexAddress = `0x${string}`;
