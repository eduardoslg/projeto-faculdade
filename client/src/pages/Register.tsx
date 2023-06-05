import { useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import * as yup from 'yup'

import { Button } from '@siakit/button'
import { Card } from '@siakit/card'
import {
  DatePicker,
  Form,
  FormHandles,
  MoneyInput,
  NumberInput,
  PasswordInput,
  TextInput,
  getValidationErrors,
} from '@siakit/form-unform'
import { Heading } from '@siakit/heading'
import { Flex } from '@siakit/layout'
import { useLoading } from '@siakit/loading'
import { Text } from '@siakit/text'
import { useToast } from '@siakit/toast'

import { api } from '../lib/api'
import convertToFloat from '../utils/convertTofloat'

const schema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
  anoNasc: yup.string().required('Campo obrigatório').nullable(),
  idade: yup.string().required('Campo obrigatório'),
  altura: yup.string().required('Campo obrigatório'),
  peso: yup.string().required('Campo obrigatório'),
  salario: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
})

export function Register() {
  const { setLoading } = useLoading()
  const { addToast } = useToast()
  const formRef = useRef<FormHandles>(null)
  const navigate = useNavigate()

  async function handleSubmit(data: any) {
    try {
      setLoading(true)

      formRef.current?.setErrors({})

      await schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/user', {
        ...data,
        type: '',
        altura: convertToFloat(data.altura),
        salario: convertToFloat(data.salario),
      })

      addToast({
        type: 'success',
        title: 'Sucesso',
        description: 'Cadastrado com sucesso! Faça seu login',
      })

      navigate('/sign-in')
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        formRef.current?.setErrors(getValidationErrors(err))
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Flex flex padding align="center" justify="center">
      <Card width={500} padding direction="column" gap={8}>
        <Flex>
          <Heading>Cadastrar uma conta</Heading>
        </Flex>

        <Form flex overflow ref={formRef} onSubmit={handleSubmit}>
          <Flex overflow direction="column" gap={8}>
            <TextInput name="nome" label="Nome" placeholder="Nome" />

            <TextInput
              name="username"
              label="Nome de Usuário"
              placeholder="Nome de Usuário"
            />

            <PasswordInput name="password" label="Senha" placeholder="Senha" />

            <MoneyInput name="salario" label="Salário" placeholder="Salário" />

            <DatePicker
              name="anoNasc"
              label="Data de Nascimento"
              placeholder="Data de Nascimento"
            />

            <NumberInput name="idade" label="Idade" placeholder="Idade" />

            <TextInput name="altura" label="Altura" placeholder="Altura" />

            <NumberInput name="peso" label="Peso" placeholder="Peso" />
          </Flex>

          <Flex flex align="end" justify="end">
            <Button type="submit">Cadastrar</Button>
          </Flex>

          <Card
            padding
            gap={4}
            justify="center"
            align="center"
            direction="column"
            css={{ background: '$blue2' }}
          >
            <Text lowContrast>Já possui uma conta?</Text>

            <Link to="/sign-in">
              <Text lowContrast>Faça o login</Text>
            </Link>
          </Card>
        </Form>
      </Card>
    </Flex>
  )
}
