import { useEffect, useRef, useState } from 'react'

import { format } from 'date-fns'
import * as yup from 'yup'

import { Button } from '@siakit/button'
import { Card } from '@siakit/card'
import { Footer } from '@siakit/footer'
import {
  Form,
  FormHandles,
  MoneyInput,
  TimePicker,
  getValidationErrors,
} from '@siakit/form-unform'
import { Flex } from '@siakit/layout'
import { useLoading } from '@siakit/loading'
import { Modal, ModalContent } from '@siakit/modal'
import { Table } from '@siakit/table'
import { Tabs, TabsContent, TabsList, TabsItem } from '@siakit/tabs'

import { api } from '../lib/api'
import convertToFloat from '../utils/convertTofloat'
import { NewCoachModal } from './NewCoachModal'
import { NewPlayerModal } from './NewPlayerModal'

const playerSchema = yup.object({
  salario: yup.string().required('Campo obrigatório'),
  bonus: yup.string().required('Campo obrigatório'),
})

const coachSchema = yup.object({
  salario: yup.string().required('Campo obrigatório'),
  horasExtras: yup
    .array()
    .min(1, 'Campo obrigatório')
    .required('Campo obrigatório'),
})

export function Home() {
  const playerFormRef = useRef<FormHandles>(null)
  const coachFormRef = useRef<FormHandles>(null)

  const { setLoading } = useLoading()

  const [players, setPlayers] = useState([])
  const [coachs, setCoachs] = useState([])

  const [playerCalc, setPlayerCalc] = useState('')
  const [coachCalc, setCoachCalc] = useState('')

  const [newPlayerModalOpen, setNewPlayerModalOpen] = useState(false)
  const [newCoachModalOpen, setNewCoachModalOpen] = useState(false)
  const [playerCalculationModalOpen, setPlayerCalculationModalOpen] =
    useState(false)
  const [coachCalculationModalOpen, setCoachCalculationModalOpen] =
    useState(false)

  async function handlePlayerSubmit(data: any) {
    console.log(data)
    try {
      setLoading(true)

      playerFormRef.current?.setErrors({})

      await playerSchema.validate(data, {
        abortEarly: false,
      })

      const totalValue =
        convertToFloat(data.salario) + convertToFloat(data.bonus)

      playerFormRef.current?.setFieldValue(
        'total',
        totalValue.toLocaleString('PT-BR', {
          minimumFractionDigits: 2,
        }),
      )

      console.log(data)
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        playerFormRef.current?.setErrors(getValidationErrors(err))
      }
    } finally {
      setLoading(false)
    }
  }

  async function handleCoachSubmit(data: any) {
    try {
      setLoading(true)

      coachFormRef.current?.setErrors({})

      await coachSchema.validate(data, {
        abortEarly: false,
      })

      const salarioMensal = convertToFloat(data?.salario)

      const horasExtras = data?.horasExtras[0]

      const taxaHoraExtra = 1.5

      const valorHoraNormal = salarioMensal / 160 // Valor da hora de trabalho (considerando 160 horas mensais)
      const valorHoraExtra = valorHoraNormal * taxaHoraExtra // Valor da hora extra (com o adicional)

      const valorHorasExtras = valorHoraExtra * horasExtras

      const totalValue = (salarioMensal + valorHorasExtras).toFixed(2)

      console.log(totalValue)

      coachFormRef.current?.setFieldValue(
        'total',
        Number(totalValue).toLocaleString('PT-BR', {
          minimumFractionDigits: 2,
        }),
      )

      console.log(data)
    } catch (err) {
      console.error(err)
      if (err instanceof yup.ValidationError) {
        coachFormRef.current?.setErrors(getValidationErrors(err))
      }
    } finally {
      setLoading(false)
    }
  }

  async function getPlayers() {
    const response = await api.get('/players')

    setPlayers(response.data)
    console.log(response.data)
  }

  async function getCoachs() {
    const response = await api.get('/coachs')

    setCoachs(response.data)
    console.log(response.data)
  }

  useEffect(() => {
    getCoachs()
    getPlayers()
  }, [])

  return (
    <>
      <NewPlayerModal
        open={newPlayerModalOpen}
        onOpenChange={() => setNewPlayerModalOpen(false)}
        onFinish={() => getPlayers()}
      />

      <NewCoachModal
        open={newCoachModalOpen}
        onOpenChange={() => setNewCoachModalOpen(false)}
        onFinish={() => getCoachs()}
      />

      <Modal
        open={playerCalculationModalOpen}
        onOpenChange={() => setPlayerCalculationModalOpen(false)}
      >
        <ModalContent title="Calcular salário" size="sm">
          <Form
            flex
            overflow
            ref={playerFormRef}
            onSubmit={handlePlayerSubmit}
            initialData={{ salario: playerCalc }}
          >
            <Flex flex overflow padding direction="column" gap={8}>
              <MoneyInput
                name="salario"
                label="Salário Base"
                placeholder="Salário Base"
              />

              <MoneyInput name="bonus" label="Bônus" placeholder="Bônus" />

              <MoneyInput
                name="total"
                label="Total Calculado"
                placeholder="Total Calculado"
                disabled
              />
            </Flex>

            <Footer>
              <Button type="submit">Calcular</Button>
            </Footer>
          </Form>
        </ModalContent>
      </Modal>

      <Modal
        open={coachCalculationModalOpen}
        onOpenChange={() => setCoachCalculationModalOpen(false)}
      >
        <ModalContent title="Calcular salário">
          <Form
            flex
            overflow
            ref={coachFormRef}
            onSubmit={handleCoachSubmit}
            initialData={{ salario: coachCalc }}
          >
            <Flex flex overflow padding direction="column" gap={8}>
              <MoneyInput
                name="salario"
                label="Salário Base"
                placeholder="Salário Base"
              />

              <TimePicker
                name="horasExtras"
                label="Horas Extras"
                placeholder="Horas Extras"
              />

              <MoneyInput
                name="total"
                label="Total Calculado"
                placeholder="Total Calculado"
                disabled
              />
            </Flex>

            <Footer>
              <Button type="submit">Calcular</Button>
            </Footer>
          </Form>
        </ModalContent>
      </Modal>

      <Modal>
        <ModalContent title="Calcular salário">
          <Form onSubmit={() => undefined}>
            <Flex padding></Flex>
          </Form>
        </ModalContent>
      </Modal>

      <Flex flex padding direction="column">
        <Card padding flex>
          <Tabs defaultValue="1">
            <TabsList>
              <Flex overflow>
                <TabsItem value="1">Jogadores</TabsItem>

                <TabsItem value="2">Técnicos</TabsItem>
              </Flex>
            </TabsList>

            <TabsContent value="1">
              <Flex flex direction="column">
                <Flex padding="16px 0px">
                  <Button onClick={() => setNewPlayerModalOpen(true)}>
                    Novo Jogador
                  </Button>
                </Flex>

                <Table
                  data={players}
                  headers={[
                    {
                      label: 'Nome',
                      dataIndex: 'nome',
                    },
                    {
                      label: 'Idade',
                      dataIndex: 'idade',
                    },
                    {
                      label: 'Peso',
                      dataIndex: 'peso',
                    },
                    {
                      label: 'Altura',
                      dataIndex: 'altura',
                    },
                    {
                      label: 'Salário',
                      dataIndex: 'salario',
                      render: (data) => 'R$ ' + data?.value,
                    },
                    {
                      label: 'Data de Nascimento',
                      dataIndex: 'anoNasc',
                      render: (data: any) =>
                        format(new Date(data?.value), 'dd/MM/yyyy'),
                    },
                    {
                      label: 'Nome na Camisa',
                      dataIndex: 'Jogador[0].nomeCamisa',
                    },
                    {
                      label: 'Gols na Carreira',
                      dataIndex: 'Jogador[0].numGolCarreira',
                    },
                    {
                      label: 'Posição',
                      dataIndex: 'Jogador[0].posicaoJoga',
                    },
                  ]}
                  actions={[
                    {
                      label: 'Calcular Salário',
                      onClick: (data) => {
                        setPlayerCalc(
                          Number(data.salario)?.toLocaleString('PT-BR', {
                            minimumFractionDigits: 2,
                          }),
                        )
                        setPlayerCalculationModalOpen(true)
                      },
                    },
                  ]}
                />
              </Flex>
            </TabsContent>

            <TabsContent value="2">
              <Flex flex direction="column">
                <Flex padding="16px 0px">
                  <Button onClick={() => setNewCoachModalOpen(true)}>
                    Novo Técnico
                  </Button>
                </Flex>

                <Table
                  data={coachs}
                  headers={[
                    {
                      label: 'Nome',
                      dataIndex: 'nome',
                    },
                    {
                      label: 'Idade',
                      dataIndex: 'idade',
                    },
                    {
                      label: 'Peso',
                      dataIndex: 'peso',
                    },
                    {
                      label: 'Altura',
                      dataIndex: 'altura',
                    },
                    {
                      label: 'Salário',
                      dataIndex: 'salario',
                      render: (data) => 'R$ ' + data.value,
                    },
                    {
                      label: 'Data de Nascimento',
                      dataIndex: 'anoNasc',
                      render: (data: any) =>
                        format(new Date(data?.value), 'dd/MM/yyyy'),
                    },
                    {
                      label: 'Apelido',
                      dataIndex: 'Tecnico[0].apelido',
                    },
                    {
                      label: 'Anos de Experiência',
                      dataIndex: 'Tecnico[0].anosExperiencia',
                      render: (data) => data.value + ' anos',
                    },
                    {
                      label: 'Tempo de Contrato',
                      dataIndex: 'Tecnico[0].tempoContrato',
                      render: (data) => data.value + ' anos',
                    },
                  ]}
                  actions={[
                    {
                      label: 'Calcular Salário',
                      onClick: (data) => {
                        setCoachCalc(
                          Number(data.salario)?.toLocaleString('PT-BR', {
                            minimumFractionDigits: 2,
                          }),
                        )
                        setCoachCalculationModalOpen(true)
                      },
                    },
                  ]}
                />
              </Flex>
            </TabsContent>
          </Tabs>
        </Card>
      </Flex>
    </>
  )
}
