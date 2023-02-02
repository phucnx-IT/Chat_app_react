import React, { createContext, useContext, useMemo, useState } from 'react'
import useFirestore from '../../Hooks/useFirestore';
import { AuthContext } from './AuthProvider';

export const AppContext = createContext();
export default function AppProvider({ children }) {
        const [isAddRoomVisible, setIsAddRoomVisible] = useState(false);
        const [isInviteMembersVisible, setIsInviteMembersVisible] = useState(false);
        const [selectedRoomId, setSelectedRoomId] = useState('')
        const { uid } = useContext(AuthContext);

        const roomCondition = useMemo(() => {
                return {
                        fieldName: 'members',
                        operator: 'array-contains',
                        compareValue: uid
                }
        }, [uid])
        const rooms = useFirestore('rooms', roomCondition)
        const selectedRoom = useMemo(() => {
                return rooms.find((room) => room.id === selectedRoomId) || {}
        }, [selectedRoomId, rooms])

        const userCondition = useMemo(() => {
                return {
                        fieldName: 'uid',
                        operator: 'in',
                        compareValue: selectedRoom.members
                }
        }, [selectedRoom.members])
        const members = useFirestore('users', userCondition)
        return (
                <AppContext.Provider
                        value={
                                {
                                        rooms,
                                        isInviteMembersVisible,
                                        setIsInviteMembersVisible,
                                        members,
                                        selectedRoom,
                                        isAddRoomVisible,
                                        setIsAddRoomVisible,
                                        selectedRoomId,
                                        setSelectedRoomId
                                }}>
                        {children}
                </AppContext.Provider>

        )
}

