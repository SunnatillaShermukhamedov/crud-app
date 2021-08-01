import React from 'react';

import Table from '../../components/Table';
import { useUsers } from '../../api/users';

const Users = () => {
  const { data: users, isSuccess: usersLoaded } = useUsers();
  return usersLoaded ? <Table data={users} /> : <div>loading...</div>;
};

export default Users;
