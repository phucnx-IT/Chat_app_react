import { Form, Input, Modal } from 'antd'
import React, { useContext } from 'react'
import { addDocument } from '../../firebase/service';
import { AppContext } from '../Context/AppProvider';
import { AuthContext } from '../Context/AuthProvider';
const {Item} = Form;
const {TextArea} = Input;
export default function AddRoomModals() {
        const { isAddRoomVisible, setIsAddRoomVisible } = useContext(AppContext);
        const user = useContext(AuthContext);
        const [form] = Form.useForm();
        const handleOk = () => {
                console.log({formData:form.getFieldValue()})
                addDocument('rooms',{...form.getFieldValue(),members:[user.uid]})
                form.resetFields();
                setIsAddRoomVisible(false)
        }
        const handleCancel = () => {
                form.resetFields();
                setIsAddRoomVisible(false)
        }
        return (
                <Modal
                        title='Create room'
                        open={isAddRoomVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}>
                        <Form form={form} layout='vertical'>
                                <Item label='Room name' name='name'>
                                        <Input placeholder='Please enter room names'></Input>
                                </Item>
                                <Item label='Room description' name='description'>
                                        <TextArea placeholder='Please enter description'></TextArea>
                                </Item>
                        </Form>
                </Modal>
        )
}
