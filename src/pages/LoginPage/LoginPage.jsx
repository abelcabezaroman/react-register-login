import React, { useContext } from 'react'
import { useForm } from "react-hook-form";
import { IsLoggedContext } from '../../shared/contexts/IsLoggedContext';
import { API } from "../../shared/services/api";

export default function LoginPage() {
    const { register, handleSubmit } = useForm();
    const {setIsLogged} = useContext(IsLoggedContext);

    const onSubmit = formData => {
        API.post('login', formData).then(res => {
            document.cookie = 'token=' + res.data.token;
            document.cookie = 'user=' +  JSON.stringify(res.data.user);
            setIsLogged(true);
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* register your input into the hook by invoking the "register" function */}
            <label htmlFor="email">Email</label>
            <input name="email" id="email" defaultValue="contacto@abelcabezaroman.com"
                   ref={register({ required: true, pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/ })}/>
            {/* include validation with required or other standard HTML validation rules */}
            <label htmlFor="password">Password</label>
            <input name="password" id="password" type="password" defaultValue={'ABCedf123'}
                   ref={register({
                       required: true,
                       pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                   })}/> {/* errors will return when field validation fails  */}
            {/*{errors.exampleRequired && <span>This field is required</span>}*/}

            <input type="submit" value="Login"/>
        </form>
    )
}
