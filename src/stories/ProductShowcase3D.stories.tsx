import type { Meta, StoryObj } from '@storybook/react'
import ProductShowcase3D from '../components/ProductShowcase3D'

const meta = {
  title: 'Components/3D/ProductShowcase3D',
  component: ProductShowcase3D,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    productName: {
      control: 'text',
      description: 'Name of the product to display',
    },
    color: {
      control: 'color',
      description: 'Color theme for the 3D model',
    },
  },
} satisfies Meta<typeof ProductShowcase3D>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    productName: 'TechArena Product',
    color: '#0ea5e9',
  },
}

export const CustomColor: Story = {
  args: {
    productName: 'Custom Product',
    color: '#10b981',
  },
}
