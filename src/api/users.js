import fetch from 'cross-fetch';
import { useCallback, useMemo } from 'react';
import { useMutation, useQuery } from 'react-query';
import cloneDeep from 'lodash/cloneDeep';

import useQueryInvalidator from '../hooks/useQueryInvalidator';
import urls from '../config/urls';
import Read from './keys';

export const getUsers = async () => {
  const res = await fetch(`${urls.apiUrl}/api/v1/users`);
  return res.json();
};

export const useUsers = () => {
  return useQuery(Read.Users(), getUsers);
};

export const updateUser = async (fields) => {
  const { id } = fields;
  const res = await fetch(`${urls.apiUrl}/api/v1/users/${id}`, {
    method: 'put',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const createUser = async (fields) => {
  const res = await fetch(`${urls.apiUrl}/api/v1/users`, {
    method: 'post',
    body: JSON.stringify(fields),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};

export const useManageUser = () => {
  const mutationFn = ({ mutationFn }) => mutationFn;
  const invalidator = useQueryInvalidator();
  const { mutate } = useMutation(mutationFn, {
    onMutate: ({ onMutate }) => {
      if (onMutate) {
        return onMutate(invalidator);
      }
      return {};
    },
    onSettled: (
      data,
      error,
      { onComplete, onError, onSuccess },
      { transaction },
    ) => {
      if (data && !error && onSuccess) {
        onSuccess(data, invalidator);
      }
      if (error && onError) {
        onError(error);
      }
      if (error && transaction) {
        transaction.rollback();
      }
      if (onComplete) {
        onComplete(data, error);
      }
    },
  });

  const onUpdateUser = useCallback(
    (fields, onComplete) => {
      const func = updateUser(fields);
      const onSuccess = (data, invalidator) => {
        const transaction = invalidator.mutate(Read.Users(), null, (data) => {
          const index = data.findIndex((item) => item.id === fields.id);
          if (data[index]) {
            const clone = cloneDeep(data);
            clone[index].name = fields.name;
            clone[index].surname = fields.surname;
            clone[index].middlename = fields.middlename;
            clone[index].dateofbirth = fields.dateofbirth;
            clone[index].address = fields.address;
            return clone;
          }
          return null;
        });
        transaction.commit();
      };
      mutate({
        mutationFn: func,
        onSuccess,
        onComplete,
      });
    },
    [mutate],
  );

  const onCreateUser = useCallback(
    (fields, onComplete) => {
      const func = createUser(fields);
      const onSuccess = (data, invalidator) => {
        invalidator.reset(Read.Users(), null);
      };
      mutate({
        mutationFn: func,
        onSuccess,
        onComplete,
      });
    },
    [mutate],
  );

  return useMemo(
    () => ({
      update: onUpdateUser,
      create: onCreateUser,
    }),
    [onUpdateUser, onCreateUser],
  );
};
