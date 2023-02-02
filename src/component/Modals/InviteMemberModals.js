import { Avatar, Form, Modal, Select, Spin } from 'antd'
import { collection, doc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { debounce } from 'lodash';
import React, { useContext, useMemo, useState } from 'react'
import { database } from '../../firebase/config';
import { AppContext } from '../Context/AppProvider';


function DeBounceSelect({ fetchOptions, debounceTimeout = 300, ...props }) {
        const [fetching, setFetching] = useState(false);
        const [option, setOption] = useState([]);

        const debounceFetcher = useMemo(() => {
                const loadOptions = (value) => {
                        setOption([]);
                        setFetching(true);
                        fetchOptions(value, props.curmembers).then(newOption => {
                                setOption(newOption);
                                setFetching(false);
                        })
                }
                return debounce(loadOptions, debounceTimeout)
        }, [debounceTimeout, fetchOptions, props.curmembers])
        return (
                <Select
                        filterOption={false}
                        onSearch={debounceFetcher}
                        notFoundContent={fetching ? <Spin size='small'></Spin> : null}
                        {...props}>
                        {
                                option.map(opt => (
                                        <Select.Option key={opt.value} value={opt.value} title={opt.label}>
                                                <Avatar size='small' src={opt.photoURL}>
                                                        {opt.photoURL ? '' : opt.label.charAt(0).toUpperCase()}
                                                </Avatar>
                                                {`${opt.label}`}
                                        </Select.Option>
                                ))
                        }

                </Select>
        )
}
async function fetchUserList(search, curMembers) {
        const user = query(collection(database, 'users')
                , where('keywords', 'array-contains', search)
                , orderBy('displayName')
                , limit(20));
        const userSnapshot = await getDocs(user);
        const data = [];
        let label;
        let value;
        let photoURL;
        userSnapshot.forEach(doc => {
                label = { label: doc.data().displayName };
                value = { value: doc.data().uid };
                photoURL = { photoURL: doc.data().photoURL };
                data.push(Object.assign(label, value, photoURL))
        })
        return data.filter(opt=> !curMembers.includes(opt.value))
}
export default function InviteMemberModals() {
        const { isInviteMembersVisible, setIsInviteMembersVisible, selectedRoom, selectedRoomId} = useContext(AppContext);
        const [value, setValue] = useState([])
        const [form] = Form.useForm();
        const handleOk = async () => {
                form.resetFields();
                const roomRef = doc(database, 'rooms', selectedRoomId);
                await updateDoc(roomRef, {
                        "members":[...selectedRoom.members,...value.map(val=>val.value)]
                })
                setIsInviteMembersVisible(false)
        }
        const handleCancel = () => {
                form.resetFields();
                setIsInviteMembersVisible(false)
        }
        return (
                <Modal
                        title='Invite members'
                        open={isInviteMembersVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <Form form={form} layout='vertical'>
                                <DeBounceSelect
                                        mode='multiple'
                                        value={value}
                                        onChange={(newValue) => setValue(newValue)}
                                        placeholder='Please enter the name of numbers'
                                        fetchOptions={fetchUserList}
                                        style={{ width: '100%' }}
                                        curmembers={selectedRoom.members}>
                                </DeBounceSelect>
                        </Form>
                </Modal>
        )
}
