import { Col, Row } from 'antd'
import React from 'react'
import ChatWindow from './ChatWindow'
import SideBar from './Sidebar'

export default function ChatRoom() {
  return (
    <Row>
      <Col span={6}>
        <SideBar></SideBar>
      </Col>
      <Col span={18}>
        <ChatWindow></ChatWindow>
      </Col>
    </Row>
  )
}
