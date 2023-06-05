import { useRef } from 'react'

import * as yup from 'yup'

import { Button } from '@siakit/button'
import { Footer } from '@siakit/footer'
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
import { Flex } from '@siakit/layout'
import { useLoading } from '@siakit/loading'
import { Modal, ModalContent } from '@siakit/modal'
import { useToast } from '@siakit/toast'

import { api } from '../lib/api'
import convertToFloat from '../utils/convertTofloat'

type ModalProps = {
  open: boolean
  onOpenChange: () => void
  onFinish: () => void
}

const Schema = yup.object({
  nome: yup.string().required('Campo obrigatório'),
  username: yup.string().required('Campo obrigatório'),
  anoNasc: yup.string().required('Campo obrigatório').nullable(),
  idade: yup.string().required('Campo obrigatório'),
  altura: yup.string().required('Campo obrigatório'),
  peso: yup.string().required('Campo obrigatório'),
  salario: yup.string().required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
  nomeCamisa: yup.string().required('Campo obrigatório'),
  posicaoJoga: yup.string().required('Campo obrigatório'),
  numGolCarreira: yup.string().required('Campo obrigatório'),
})

export function NewPlayerModal({ open, onOpenChange, onFinish }: ModalProps) {
  const formRef = useRef<FormHandles>(null)
  const { setLoading } = useLoading()
  const { addToast } = useToast()

  async function handleSubmit(data: any) {
    try {
      setLoading(true)

      formRef.current?.setErrors({})

      await Schema.validate(data, {
        abortEarly: false,
      })

      await api.post('/persons', {
        ...data,
        type: 'J',
        altura: convertToFloat(data.altura),
        salario: convertToFloat(data.salario),
        player: {
          nomeCamisa: data.nomeCamisa,
          posicaoJoga: data.posicaoJoga,
          numGolCarreira: data.numGolCarreira,
        },
      })

      addToast({
        type: 'success',
        title: 'Sucesso!',
        description: 'Contrato criado com sucesso!',
      })

      onFinish()
      onOpenChange()
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const errors = getValidationErrors(err)

        formRef.current?.setErrors(errors)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open={open} onOpenChange={onOpenChange}>
      <ModalContent title="Novo Jogador">
        <Form overflow ref={formRef} onSubmit={handleSubmit}>
          <Flex overflow padding direction="column" gap={8}>
            <Flex gap={8}>
              <TextInput name="nome" label="Nome" placeholder="Nome" />

              <TextInput
                name="username"
                label="Nome de Usuário"
                placeholder="Nome de Usuário"
              />
            </Flex>

            <Flex gap={8}>
              <DatePicker
                name="anoNasc"
                label="Data de Nascimento"
                placeholder="Data de Nascimento"
              />

              <NumberInput name="idade" label="Idade" placeholder="Idade" />

              <TextInput name="altura" label="Altura" placeholder="Altura" />
            </Flex>

            <Flex gap={8}>
              <NumberInput name="peso" label="Peso" placeholder="Peso" />

              <MoneyInput
                name="salario"
                label="Salário"
                placeholder="Salário"
              />

              <PasswordInput
                name="password"
                label="Senha"
                placeholder="Senha"
              />
            </Flex>

            <Flex gap={8}>
              <TextInput
                name="nomeCamisa"
                label="Nome na Camisa"
                placeholder="Nome na Camisa"
              />

              <TextInput
                name="posicaoJoga"
                label="Posição"
                placeholder="Posição"
              />

              <NumberInput
                name="numGolCarreira"
                label="Número de Gols"
                placeholder="Número de Gols"
              />
            </Flex>
          </Flex>

          <Footer>
            <Button variant="ghost" colorScheme="gray" type="button">
              Cancelar
            </Button>

            <Button type="submit">Salvar</Button>
          </Footer>
        </Form>
      </ModalContent>
    </Modal>
  )
}
