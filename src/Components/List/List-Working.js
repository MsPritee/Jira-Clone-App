import React, { useState } from 'react';
import Card from '../Card/Card';
import NewItems from '../NewItems';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import "./List.css"
import ListModal from '../Modal/ListModal';






const List = ({ handleModelOpen }) => {
    const listItem = useSelector(store => store.listSlice.list);

    const [isListModalOpen, setIsListModalOpen] = useState(false);

    const openListModal = () => {
        setIsListModalOpen(true);
    };
    const closeListModal = () => {
        setIsListModalOpen(false);
    };

    return (
        <>

            {listItem.map((list) => (
                <div key={list.id} className=' gap-1 mt-2 p-1 w-1/3  '>
                    <div className='list p-2 bg-gray-200 rounded-md '>
                        <div className='list_top flex justify-between'>
                            <div className='list_top_title mb-3 font-bold'>{list.title}</div>
                            <button className='edit-List-btn' onClick={openListModal}>
                                <FontAwesomeIcon className='m-3' icon={faEllipsis} />
                            </button>
                        </div>
                        <ListModal isListOpen={isListModalOpen} onListClose={closeListModal} />
                        {list?.children?.length > 0 && list.children.map((children) =>
                            <Card key={children.id} cardInfo={children} />
                        )}
                        <div><NewItems type='card' parentId={list.id} /></div>
                    </div>
                </div>
            ))}
            <div className='p-3 w-1/3'>
                <div className='p-3 bg-gray-200 '>
                    {/* <Card /> */}
                    <NewItems />
                </div>
            </div>
        </>
    )
}

export default List