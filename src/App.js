import Login from './component/Login';
import ChatRoom from './component/ChatRoom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthProvider from './component/Context/AuthProvider';
import AppProvider from './component/Context/AppProvider';
import AddRoomModals from './component/Modals/AddRoomModals';
import InviteMemberModals from './component/Modals/InviteMemberModals';

function App() {
        return (
                <BrowserRouter>
                        <AuthProvider>
                                <AppProvider>
                                        <Routes>
                                                <Route path='/login' element={<Login></Login>} />
                                                <Route path='/' element={<ChatRoom></ChatRoom>} />
                                        </Routes>
                                        <AddRoomModals/>
                                        <InviteMemberModals/>
                                </AppProvider>
                        </AuthProvider>
                </BrowserRouter>
        );
}

export default App;
