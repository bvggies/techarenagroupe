import type { Meta, StoryObj } from '@storybook/react'
import Reviews from '../components/Reviews'
import { ToastProvider } from '../contexts/ToastContext'

const meta = {
  title: 'Components/Reviews',
  component: Reviews,
  decorators: [
    (Story) => (
      <ToastProvider>
        <Story />
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Reviews>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
