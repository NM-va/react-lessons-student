import { TabItem } from '../HeadDetail/HeadDetail';
import cls from '../HeadDetail/Head.module.css';
import { useCallback } from 'react';

export interface Props {
    tabs: TabItem[];
    onTabChange?: (key: string) => void;
    selectedTab: string;
}

export const Tabs = ({ tabs, onTabChange, selectedTab }: Props) => {
    if (tabs?.length === 0) return;
    
    const onSelectedTab = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const item = e.currentTarget.closest('[data-id]');
        const id = (item as HTMLButtonElement)?.dataset?.id;

        if (id && onTabChange) {
            onTabChange?.(id);
        }
    }, [onTabChange]);

    return (
        <ul className={`${cls.tabList}`}>
            {
                tabs.map((item: TabItem) => {
                    return (
                        <li key={item.key} className={`${cls.tabItem} ${item.key === selectedTab ? cls.tabActive : ''}`}>
                            <button className={`${cls.tab}`} data-id={item.key}  disabled={item.disabled} onClick={onSelectedTab}>{item.label}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}
