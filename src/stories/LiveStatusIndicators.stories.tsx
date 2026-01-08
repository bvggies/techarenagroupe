import type { Meta, StoryObj } from '@storybook/react'
import LiveStatusIndicators from '../components/LiveStatusIndicators'

const meta = {
  title: 'Components/LiveStatusIndicators',
  component: LiveStatusIndicators,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LiveStatusIndicators>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
