import React from 'react';
import cls from '../HeadDetail/Head.module.css';

export const TabContent = ({selectedTab, content}) => {
    
    return (content.filter((item) => {
        console.log('item content', item.content);
        // if (selectedTab === item.id) {
        //     return (
        //         <div key={item.id} className={`${cls.tabContent}`}>
        //             {item.content}
        //         </div>
        //     )
        // }
    }))
}