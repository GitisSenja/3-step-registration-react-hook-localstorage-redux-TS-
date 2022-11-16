import React, {FC, useEffect} from 'react';
import {useForm} from "react-hook-form";
import {IUser} from "./types";

import classes from "component/RegistrationForm/RegistrationForm.module.css";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setUserInfo} from "../../app/userReduser/userReduser";

const DEFAULT_VALUES: IUser = {
    userName: '',
    email: '',
    lastName: '',
}

const RegistrationStep1: FC = (): JSX.Element => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector((state => state.userInfo))

    const {
        watch,
        setValue,
        handleSubmit,
        register,
        formState: {errors},

    } = useForm({
        defaultValues: DEFAULT_VALUES
    })

    const onSubmit = (userInfo: IUser) => {
        dispatch(setUserInfo(userInfo))
        console.log('@@@userInfo', userInfo);
    }

    const setChangeName = (e: React.ChangeEvent<HTMLInputElement>, action: string) => {
        if (action === "userName") setValue("userName", e.target.value)
        if (action === "email") setValue("email", e.target.value)
        if (action === "lastName") setValue("lastName", e.target.value)
    }

    useEffect(() => {
        register("userName", {
            required: "Failed is required",
            minLength: {
                value: 4,
                message: "The name must contain more than 4 letters",
            },
            maxLength: {
                value: 12,
                message: "Name must be less than 12 characters"
            }
        })
        register("email", {
            required: "Field is required",
            pattern: {
                value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                message: "Invalid email address"
            }
        })
        register("lastName", {
            required: "Failed is required",
            minLength: {
                value: 4,
                message: "The name must contain more than 4 letters",
            },
            maxLength: {
                value: 12,
                message: "Name must be less than 12 characters"
            }
        })
    }, [register])

    return (
        <div className={classes.main}>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.inputBox}>
                    <input
                        className={classes.input}
                        placeholder={'Name'}
                        type={"text"}
                        value={watch("userName")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeName(e, "userName")}
                    />
                    {<p className={classes.errorMessage}>{errors.userName ? errors.userName.message : null}</p>}
                </div>
                <div className={classes.inputBox}>
                    <input
                        className={classes.input}
                        placeholder={"email"}
                        type={"text"}
                        value={watch("email")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeName(e, "email")}
                    />
                    {<p className={classes.errorMessage}>{errors.email ? errors.email.message : null}</p>}
                </div>
                <div className={classes.inputBox}>
                    <input
                        className={classes.input}
                        placeholder={"Last name"}
                        type={"text"}
                        value={watch("lastName")}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setChangeName(e, "lastName")}
                    />
                    {<p className={classes.errorMessage}>{errors.lastName ? errors.lastName.message : null}</p>}
                </div>
                <button type={"submit"}>Продолжить регистрацию</button>
            </form>
        </div>
    );
};

export default RegistrationStep1;
