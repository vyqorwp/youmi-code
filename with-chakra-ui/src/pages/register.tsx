import React from 'react'
import {Formik,Form} from 'formik'
import { FormControl, FormLabel, Input, FormErrorMessage, Box, Button } from '@chakra-ui/core';
import {Wrapper} from '../components/Wrapper'
import { InputField } from '../components/InputField';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { toErrorMap } from '../utils/toErrorMap';
import {useRouter} from 'next/router'

interface registerProps {

}

const Register: React.FC<registerProps> = ({ }) => {
    const router = useRouter()
const [, register]= useRegisterMutation()
    return (
      <Wrapper variant="small">
        <Formik
          initialValues={{
            userName: '',
            password: '',
          }}
          onSubmit={async (values,{setErrors}) => {
              const r = await register(values)
              console.log(r.data)
              if (r.data?.register.errors) {
                  setErrors(
                     toErrorMap(r.data.register.errors)
                  )
              } else if(r.data?.register.user){
                  router.push('/')
              }
          }}
        >
          {({isSubmitting}) => (
            <Form>
              <InputField
                name="userName"
                placeholder="username"
                label="User Name"
              />
              <Box mt={4}>
                <InputField
                  name="password"
                  placeholder="password"
                  label="Password"
                  type="password"
                />
              </Box>
                        <Button mt={4} type="submit" isLoading={isSubmitting} variantColor="teal">
                register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    );
}
export default Register