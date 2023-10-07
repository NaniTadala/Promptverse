export function signin_validation(values) {
    const errors = {};

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = "Required"
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters long"
    } else if (values.password.includes(' ')) {
        errors.password = "Invalid Password"
    }

    return errors;
}

export function signup_validation(values) {
    const errors = {};

    if (!values.name) {
        errors.name = "Required";
    } else if (values.name.includes(' ')) {
        errors.email = 'Invalid username';
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }

    if (!values.password) {
        errors.password = "Required"
    } else if (values.password.length < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters long"
    } else if (values.password.includes(' ')) {
        errors.password = "Invalid Password"
    }

    if (!values.cPassword) {
        errors.cPassword = "Required"
    } else if (values.cPassword !== values.password) {
        errors.cPassword = "Password didn't match"
    } else if (values.password.includes(' ')) {
        errors.password = "Invalid Password"
    }

    return errors;
}