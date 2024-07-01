import React from 'react'
import useUser from './useUser'
import UserRow from './UserRow';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
export default function UserTable() {
    const {isLoading,users,error}=useUser();
    console.log(users)
    if(isLoading)
        {
            <Spinner />
        }
  return (
    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
   <Table.Header>
    <div></div>
    <div>Name</div>
    <div>Email</div>
    <div>Role</div>
    <div>Active</div>
    <div></div>
</Table.Header>
<Table.Body data={users?.data} render={user=><UserRow user={user} key={user._id} />} />
   </Table>
  )
}
