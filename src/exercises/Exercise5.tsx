import React, { useState } from 'react'
import { DetailAside } from '../components/DetailAside/DetailAside';

enum HeaderActions {
    OPEN_MODAL = 'OPEN_MODAL'
}

enum FooterActions {
    SAVE = 'SAVE',
    CANCEL = 'CANCEL'
}

//todo добавить enum Tabs

// Упражнение 5:
const Exercise5: React.FC = () => {
    const [showDetail, setShowDetail] = useState<boolean>(true);
    //todo selected tab
    
    const onActionHandler = (action: string) => {
        switch (action) {
            case FooterActions.SAVE:
                console.log('save');
                break;
            
            case FooterActions.CANCEL:
                console.log('cancel');
                break;
        }
    }

    const onMenuActionHandler = (action: HeaderActions) => {
        switch (action) {
            case HeaderActions.OPEN_MODAL:
                console.log('open modal');
                break;
        }
    }
    
    return (
        <div className="wrap-container">
            <h1>Упражнение 5</h1>
            <button onClick={() => setShowDetail(true)}>Открыть деталь</button>
            {showDetail && (
                <DetailAside<HeaderActions>
                    headProps={{
                        title: 'header',
                        description: 'header detail aside',
                        onClose: () => {
                            console.log('MY CLOSE');
                            setShowDetail(false);
                        },
                        menuActions: [{ key: HeaderActions.OPEN_MODAL, label: 'Открыть окно', onAction: onMenuActionHandler }]
                    }}
                    footerProps={{
                        actions: [
                            { key: FooterActions.SAVE, label: FooterActions.SAVE, primary: true, disabled: false },
                            //todo сделать primary стили для кнопок
                            { key: FooterActions.CANCEL, label: FooterActions.CANCEL, primary: false, disabled: false }
                        ],
                        onAction: onActionHandler,
                    }}
                >
                    //todo отрисуем содержимое первого таба
                    <div>tab(1)1</div>
                    <div>tab(1)2</div>
                    <div>tab(1)3</div>
                    <div>tab(1)1</div>
                    <div>tab(1)2</div>
                    //todo отрисуем содержимое второго таба
                    <div>tab(2)3</div>
                    <div>tab(2)1</div>
                    <div>tab(2)2</div>
                    <div>tab(2)3</div>
                    <div>tab(2)1</div>
                    <div>tab(2)2</div>
                    <div>tab(2)3</div>
                </DetailAside>
            )}
        </div>
    );
};

export default Exercise5;