import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import  { useEffect, useState } from 'react'
import { database } from '../firebase/config';

const useFirestore = (collect, condition) => {
        const [document, setDocument] = useState([])
        useEffect(() => {
                let collectionRef = collection(database,collect);
                let id;
                let q;
                if (condition) {
                        if (!condition.compareValue || !condition.compareValue.length) {
                                return;
                        }
                        q = query(collectionRef,where(condition.fieldName, condition.operator, condition.compareValue),orderBy("createdAt"))
                }
                const unsubscribe = onSnapshot(q?q:collectionRef,(snapshot)=>{
                        const data =[];
                        snapshot.forEach(doc=>{
                                id = {id:doc.id}
                                data.push(Object.assign(doc.data(),id))
                        })
                        setDocument(data);
                })
                return unsubscribe;
        }, [collect, condition])
        return document;
}
export default useFirestore;