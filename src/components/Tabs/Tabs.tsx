import { TabItem } from '../HeadDetail/HeadDetail';
import cls from '../HeadDetail/Head.module.css';

export const Tabs = ({ tabs, onTabChange, selectedTab }: TabItem[]) => {
    if (tabs?.length === 0) return;
    
    const onSelectedTab = (e) => {
        const parent = e.target.closest('[data-id]');
        const id = parent.dataset.id;
        if (id === selectedTab) {
            onTabChange(id);
        }
    };
    
    return (
        <ul className={`${cls.tabList}`}>
            {
                tabs.map((item: TabItem) => {
                    return (
                        <li key={item.key} data-id={item.key} className={`${cls.tabItem}`}>
                            <button className={`${cls.tab}`} disabled={item.disabled} onClick={onSelectedTab}>{item.label}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}
