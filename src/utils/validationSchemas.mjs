export const createUserValidationSchema = {
    username:{
        isLength:{
            options:{
                min: 5,
                max:32
            },
            errorMessage:"Username must be between 3-32 characters"
        },
        notEmpty:{
            errorMessage:"Username cannot be empty"
        },
        isString:{
            errorMessage:"Username must be string"
        },
    },

    displayName:{
        notEmpty:true
    },

    password:{
        notEmpty:true
    }
}