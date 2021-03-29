import * as Types from './types'

export const editProfileSubmit = (userProfile, user_id) => {
    return {
        type: Types.USER_PROFILE_EDIT, userProfile, user_id
    }
}