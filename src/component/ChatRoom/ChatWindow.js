import { UserAddOutlined } from '@ant-design/icons';
import { Alert, Avatar, Button, Form, Input, Tooltip } from 'antd';
import React, { useContext, useMemo, useState } from 'react'
import styled from 'styled-components'
import { addDocument } from '../../firebase/service';
import useFirestore from '../../Hooks/useFirestore';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
import Message from './Message';

const { Group } = Avatar;
const { Item } = Form;
const HeaderStyled = styled.div`
        display:flex;
        justify-content: space-between;
        height: 56px;
        padding: 0 16px;
        align-items: center;
        border-bottom: 1px solid rgb(230, 230, 230);
        
        .header{
                &_info{
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                }

                &_title{
                        margin: 0;
                        font-weight: bold;
                }

                &_description{
                        font-size: 12px;
                }
        }
`;

const ButtonGroupStyled = styled.div`
        display:flex;
        align-items: center;
`;

const WrapperStyled = styled.div`
        height:100vh;
`;

const ContentStyled = styled.div`
        height: calc(100% - 80px);
        display: flex;
        flex-direction: column;
        padding: 11px;
        justify-content: flex-end;
`;

const FormStyled = styled(Form)`
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 2px 2px 2px 0px;
        border: 1px solid rgb(230, 230, 230);
        border-radius: 2px;
        
        .ant-form-item{
                flex: 1;
                margin-bottom:0;
        }
`;
const MessageListStyled = styled.div`
        max-height:100%;
        over-flow-y:auto;
`;
export default function ChatWindow() {
        const { selectedRoom, members, setIsInviteMembersVisible } = useContext(AppContext);
        const { uid, photoURL, displayName } = useContext(AuthContext);
        const [inputValue, setInputValue] = useState('')
        const [form] = Form.useForm();
        const handleInputChange = (e) => {
                setInputValue(e.target.value)
        }
        const handleOnSubmit = () => {
                addDocument('messages', {
                        text: inputValue,
                        uid,
                        photoURL,
                        roomId: selectedRoom.id,
                        displayName
                })
                form.resetFields(['message'])
        }
        const condition = useMemo(() => ({
                fieldName: 'roomId',
                operator: '==',
                compareValue: selectedRoom.id
        }), [selectedRoom.id])

        const messages = useFirestore('messages', condition);
        return (
                <WrapperStyled>
                        {selectedRoom.id ? (<>
                                <HeaderStyled>
                                        <div className='header_info'>
                                                <p className='header_title'>{selectedRoom.name}</p>
                                                <span className='header_description'>{selectedRoom.description}</span>
                                        </div>
                                        <ButtonGroupStyled>
                                                <Button icon={<UserAddOutlined />} onClick={() => setIsInviteMembersVisible(true)} type='text'>Invite</Button>
                                                <Group size="small" maxCount={2}>
                                                        {members.map((member) =>
                                                                <Tooltip title={member.displayName} key={member.uid}>
                                                                        <Avatar src={member.photoURL}>{member.photoURL ? '' : member.displayName.charAt(0).toUpperCase()}</Avatar>
                                                                </Tooltip>
                                                        )}
                                                </Group>
                                        </ButtonGroupStyled>
                                </HeaderStyled>
                                <ContentStyled>
                                        <MessageListStyled>
                                                {messages.map(mes =>
                                                        <Message key={mes.id} text={mes.text} photoURL={mes.photoURL} displayName={mes.displayName} createdAt={mes.createdAt}></Message>
                                                )}
                                        </MessageListStyled>
                                        <FormStyled form={form}>
                                                <Item name="message">
                                                        <Input
                                                                bordered={false}
                                                                autoComplete='off'
                                                                placeholder='Nhap tin nhan'
                                                                onChange={handleInputChange}
                                                                onPressEnter={handleOnSubmit}
                                                        ></Input>
                                                </Item>
                                                <Button type='primary' onClick={handleOnSubmit}>Gui</Button>
                                        </FormStyled>
                                </ContentStyled>
                        </>) : <Alert type='info' message='Please choose the room' showIcon style={{ margin: 5 }} closable></Alert>}
                </WrapperStyled>
        )
}
