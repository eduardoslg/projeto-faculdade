import { useNavigate } from 'react-router-dom'

import { DeviceMobile, Gear, UserCircle } from 'phosphor-react'

import { Flex } from '@siakit/layout'
import {
  Menu,
  Sidebar as SidebarSiakit,
  MenuHeader,
  MenuItem,
  SubMenuTitle,
  SubMenuSeparator,
  SubMenuItem,
  SubMenu,
} from '@siakit/sidebar'
import { Text } from '@siakit/text'

export function Sidebar() {
  const navigate = useNavigate()

  return (
    <Flex>
      <SidebarSiakit>
        <Menu>
          <MenuHeader>
            <Flex
              onClick={() => navigate('/')}
              padding={16}
              align="center"
              justify="center"
              css={{ color: '#fff', cursor: 'pointer', fontWeight: '$bold' }}
            >
              Projeto Faculdade
            </Flex>

            <Flex flex justify="center">
              <Text
                css={{ color: '#fff', cursor: 'pointer', fontWeight: '$bold' }}
              >
                F
              </Text>
            </Flex>
          </MenuHeader>

          <MenuItem value="1" icon={<Gear size={32} />}>
            Home
          </MenuItem>
        </Menu>

        <SubMenu value="1">
          <SubMenuTitle>ADM</SubMenuTitle>

          <SubMenuSeparator />

          <SubMenuItem onClick={() => navigate('/')}>
            Jogadores/Técnicos
          </SubMenuItem>

          <SubMenuSeparator />
        </SubMenu>

        <SubMenu value="2">
          <SubMenuTitle>Clientes</SubMenuTitle>
          <SubMenuSeparator />
          <SubMenuItem onClick={() => navigate('/clients')}>
            Cadastro
          </SubMenuItem>
        </SubMenu>

        <SubMenu value="3">
          <SubMenuTitle>Equipamentos</SubMenuTitle>
          <SubMenuSeparator />
          <SubMenuItem onClick={() => navigate('/equipment')}>
            Cadastro
          </SubMenuItem>
        </SubMenu>
      </SidebarSiakit>
    </Flex>
  )
}
