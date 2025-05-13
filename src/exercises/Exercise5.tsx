import React from 'react'
import { DetailAside } from '../components/DetailAside/DetailAside';

enum actionsHeader {
    CLOSE = 'CLOSE'
}

enum actionsFooter {
    SAVE = 'SAVE',
    CANCEL = 'CANCEL'
}

// Упражнение 5:
const Exercise5: React.FC = () => {
    
    const onActionHandle = (action) => {
        switch (action) {
            case 'SAVE':
                console.log('save');
                break;
            
            case 'CANCEL':
                console.log('cancel');
                break;
        }
    }
    
    const header = {
        title: 'header',
        description: 'header detail aside',
        onClose: () => {},
        menuActions: [{ key: actionsHeader.CLOSE, label: actionsHeader.CLOSE, icon: 'close' }]
    }
    
    const footer = {
        actions: [{  key: actionsFooter.SAVE, label: actionsFooter.SAVE, primary: true, disabled: false },
            {  key: actionsFooter.CANCEL, label: actionsFooter.CANCEL, primary: true, disabled: false }],
        onAction: () => onActionHandle('SAVE')
    }
    

    
    return (
        <div className="wrap-container">
            <h1>Упражнение 5</h1>
            <DetailAside headProps={header} footerProps={footer}>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>1</div>
                <div>2</div>
                <div>3</div>
            </DetailAside>
        </div>
    );
};

export default Exercise5;