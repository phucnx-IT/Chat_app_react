import { Avatar, Button, Typography } from 'antd'
import React, { useContext } from 'react'
import styled from 'styled-components';
import { auth } from '../../firebase/config'
import { AuthContext } from '../Context/AuthProvider';

const { Text } = Typography;

const WrapperStyled = styled.div`
        display:flex;
        justify-content:space-between;
        padding: 12px 16px;
        border-bottom: 1px solid rgba(82,38,83);
        .username{
                color:white;
                margin-left: 5px;
        }
`;
export default function UserInfo() {
        // useEffect(() => {
        //       onSnapshot(query(collection(database,'users')),(querySnapshot)=>{
        //         querySnapshot.forEach((doc)=>{
        //                 console.log(doc.data())
        //         })
        //       })
        // }, [])
        const {displayName, photoURL} = useContext(AuthContext);
        return (
                <WrapperStyled>
                        <div>
                                <Avatar src={photoURL}>{photoURL?'':displayName.charAt(0).toUpperCase()}</Avatar>
                                <Text className='username'>{displayName}</Text>
                        </div>
                        <Button ghost onClick={() => auth.signOut()}>
                                Dang xuat
                        </Button>
                </WrapperStyled>
        )
}
