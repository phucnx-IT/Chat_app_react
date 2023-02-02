import React from 'react'
import { Row, Col, Button, Typography } from 'antd'
import { auth, database } from '../../firebase/config';
import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { generateKeywords } from '../../firebase/service';
const { Title } = Typography;

const fbProvider = new FacebookAuthProvider();
export default function Login() {
        const handleFBLogin = async () => {
                const { _tokenResponse, user } = await signInWithPopup(auth, fbProvider)
                if (_tokenResponse.isNewUser) {
                        try {
                                const docRef = await addDoc(collection(database,"users"),{
                                        displayName: user.displayName,
                                        email: user.email,
                                        photoURL: user.photoURL,
                                        uid: user.uid,
                                        providerID: _tokenResponse.providerId,
                                        createdAt: serverTimestamp(),
                                        keywords:generateKeywords(user.displayName)
                                })
                                console.log("Document written with ID: ", docRef.id);
                        } catch (error) {
                                console.error("Error adding document: ", error);
                        }
                }
        }
        return (
                <div>
                        <Row justify="center" style={{ height: 800 }}>
                                <Col span={8}>
                                        <Title style={{ textAlign: 'center' }} level={3}>
                                                Fun Chat
                                        </Title>
                                        <Button style={{ width: '100%', marginBottom: 5 }}>
                                                Login by Google
                                        </Button>
                                        <Button onClick={handleFBLogin} style={{ width: '100%' }}>
                                                Login by Facebook
                                        </Button>
                                </Col>
                        </Row>
                </div>
        )
}
