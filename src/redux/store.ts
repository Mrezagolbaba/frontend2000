import { configureStore } from '@reduxjs/toolkit'
import userReducer from 'redux/features/user/userSlice'
import settingReducer from 'redux/features/settings/settingSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    seting:settingReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch