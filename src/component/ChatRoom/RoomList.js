import {PlusSquareOutlined } from '@ant-design/icons';
import { Button, Collapse, Typography } from 'antd'
import React, { useContext } from 'react'
import styled from 'styled-components';
import { AppContext } from '../Context/AppProvider';

const {Panel}= Collapse;
const {Link}=Typography;

const PanelStyled = styled(Panel)`
        &&& {
                .ant-collapse-header , p{
                        color:white
                }
                .ant-collapse-content-box{
                        padding: 0 40px;
                }
                .add-room{
                        color:white;
                        padding:0px;
                }
        }
`;
const LinkStyle = styled(Link)`
        display: block;
        margin-bottom: 5px;
`;
export default function RoomList() {
        const {rooms, setIsAddRoomVisible, setSelectedRoomId} = useContext(AppContext);
        const handleAddRoom = ()=>{
                setIsAddRoomVisible(true)
        }
  return (
        <Collapse ghost defaultActiveKey={['1']}>
                <PanelStyled header="Danh sach cac phong" key='1'>
                        {rooms&&rooms.map(room=><LinkStyle key={room.id} onClick={()=>setSelectedRoomId(room.id)}>{room.name}</LinkStyle>)}
                        <Button type='text' icon={<PlusSquareOutlined/>} className='add-room' onClick={handleAddRoom}>Add Room</Button>
                </PanelStyled>
        </Collapse>
  )
}
