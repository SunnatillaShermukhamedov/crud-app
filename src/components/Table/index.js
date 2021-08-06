import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import Row from './Row';
import Button from '../Button';
import Paragraph from '../Paragraph';
import UserFormModal from '../../containers/UserFormModal';
import UserDeleteModal from '../../containers/UserDeleteModal';

import palette from '../../styles/palette';

const StyledTable = styled.table`
  height: 60vh;
  width: 100%;
  border: 3px solid ${palette.alto};
`;

const Table = ({ data }) => {
  const [editProfile, setEditProfile] = useState(false);
  const openEditModal = useCallback((profile) => setEditProfile(profile), []);

  const [deleteProfile, setDeleteProfile] = useState(false);
  const openDeleteModal = useCallback((profile) => setDeleteProfile(profile), []);

  return (
    <>
      <StyledTable>
        <thead>
          <Row>
            <td>Surname</td>
            <td>Name</td>
            <td>Patronymic</td>
            <td>Date of birth</td>
            <td>Address</td>
            <td></td>
          </Row>
        </thead>
        <tbody>
          {data.map((profile, index) => (
            <Row key={index}>
              <td>{profile.surname}</td>
              <td>{profile.name}</td>
              <td>{profile.middlename}</td>
              <td>{format(new Date(profile.dateofbirth), 'yyyy-MM-dd')}</td>
              <td>{profile.address}</td>
              <td>
                <Paragraph as="div" $marginBottom="0" $textAlign="center">
                  <Button
                    title="Edit"
                    size="small"
                    $margin="0 5px 0 5px"
                    onClick={openEditModal.bind(null, profile)}
                  ></Button>{' '}
                  <Button
                    title="Del"
                    size="small"
                    $margin="0 5px 0 5px"
                    onClick={openDeleteModal.bind(null, profile)}
                  ></Button>
                </Paragraph>
              </td>
            </Row>
          ))}
        </tbody>
      </StyledTable>

      {editProfile && (
        <UserFormModal
          title="Edit user"
          closeModal={() => setEditProfile(false)}
          profile={editProfile}
        />
      )}
      {deleteProfile && (
        <UserDeleteModal
          title="Delete user"
          closeModal={() => setDeleteProfile(false)}
          profile={deleteProfile}
        />
      )}
    </>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
