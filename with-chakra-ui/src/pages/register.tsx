import React from 'react'
import {Formik,Form} from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/core';
import {Wrapper} from '../components/Wrapper'

interface registerProps {

}


const Register: React.FC<registerProps>=({}) => {
    return (
        <Wrapper>

        <Formik initialValues={{
        userName: '', passworld:''}} onSubmit={values=>{console.log(values)}}>{({values, handleChange}) => (<FormControl>
                <FormLabel htmlFor="userName">User Name</FormLabel>
            <Input id="userName" placeholder="username" value={values.userName} onChange={handleChange}/>
                {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
              </FormControl>)}</Formik>            
        </Wrapper>);
}
export default Register