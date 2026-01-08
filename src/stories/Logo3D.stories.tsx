import type { Meta, StoryObj } from '@storybook/react'
import Logo3D from '../components/Logo3D'

const meta = {
  title: 'Components/3D/Logo3D',
  component: Logo3D,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Logo3D>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
