import { Avatar, Typography } from 'antd'
import { formatRelative } from 'date-fns/esm';
import React from 'react'
import styled from 'styled-components';

const {Text} = Typography;

const WrapperStyled = styled.div`
        margin-bottom:10px;
        .author{
                margin-left: 5px;
                font-weight:bold;
        }
        .date{
                margin-left: 5px;
                font-size: 11px;
                color: #a7a7a7;
        }
        .content{
                margin-left: 30px
        }
`;
function formatDate (seconds){
        let formattedDate = '';
        if (seconds) {
                formattedDate = formatRelative(new Date(seconds*1000), new Date());
                formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
        }
        return formattedDate;
}
export default function Message({text, displayName, createdAt, photoURL}) {
  return (
    <WrapperStyled>
        <div>
                <Avatar src={photoURL} size='small'>{photoURL?'':displayName.charAt(0).toUpperCase}</Avatar>
                <Text className='author'>{displayName}</Text>
                <Text className='date'>{createdAt?formatDate(createdAt.seconds):''}</Text>
        </div>
        <div>
                <Text className='content'>{text}</Text>
        </div>
    </WrapperStyled>
  )
}
