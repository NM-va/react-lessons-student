import { api } from './api';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => (
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['api/executeQuery/fulfilled'],
                ignoredPaths: ['api.queries.getTasks.data'],
            },
        }).concat(api.middleware)
    )
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const dispatch = store.dispatch as AppDispatch;
