import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import UserListItem from '../UserListItem';
import { listUsers } from '../../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';


const UserList = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const usersData = await API.graphql(graphqlOperation(listUsers))
                setUsers(usersData.data.listUsers.items)
            } catch (e) {
                console.log(e);
            }
        }
        fetchUsers();
    }, [])

    return (
        <View>
            <FlatList
                data={users}
                renderItem={({ item }) => <UserListItem user={item} />}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}

export default UserList
