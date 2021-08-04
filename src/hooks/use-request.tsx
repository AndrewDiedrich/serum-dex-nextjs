import axios from 'axios';
import { useState } from 'react';
import { Callout, Intent } from '@blueprintjs/core';
import useSWR, { ConfigInterface } from 'swr';

interface IRequestTypes {
  url: string;
  method: string;
  body: any;
  onSuccess: any;
}

const fetcherWithPostProcessing = (
  post: (raw: any) => Promise<any> = (raw: any) => raw,
): ((input: RequestInfo, init?: RequestInit) => any) => {
  return (input: RequestInfo, init?: RequestInit): any =>
    fetch(input, init)
      .then((res) => res.json())
      .then((raw) => post(raw));
};
export const useRequest = ({ url, method, body, onSuccess }: IRequestTypes) => {
  const [errors, setErrors] = useState<JSX.Element | null>(null);
  const doRequest = async (additionalBody: any = {}, props: any = {}) => {
    try {
      setErrors(null);
      const finalBody = { ...body, ...additionalBody };
      const response = await axios[method](url, { ...finalBody, ...props });

      // After a successful response
      onSuccess?.(response.data);
      return response.data;
    } catch (err) {
      setErrors(
        <Callout intent={Intent.DANGER} title={'Error'}>
          <ul>
            {err.response?.data.errors.map(
              (err: Error): JSX.Element => (
                <li key={err.message}>{err.message}</li>
              ),
            )}
          </ul>
        </Callout>,
      );
    }
  };

  return { doRequest, errors };
};

export const getSwr = (
  apiRoute: string,
  config: ConfigInterface = {},
  post?: (raw: any) => Promise<any>,
): { data?: any; error?: string; isValidating: boolean } => {
  return useSWR(apiRoute, fetcherWithPostProcessing(post), config);
};
