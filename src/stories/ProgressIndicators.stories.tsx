import type { Meta, StoryObj } from '@storybook/react'
import ProgressIndicators, { ProjectProgress, SkillLevel, AchievementBadge } from '../components/ProgressIndicators'
import { FiAward, FiTrendingUp } from 'react-icons/fi'

const meta = {
  title: 'Components/ProgressIndicators',
  component: ProgressIndicators,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressIndicators>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const ProjectProgressExample: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto space-y-4">
        <ProjectProgress
          projectName="E-Commerce Platform"
          progress={75}
          status="testing"
          deadline="2024-02-15"
        />
        <ProjectProgress
          projectName="Mobile App"
          progress={45}
          status="development"
          deadline="2024-03-01"
        />
      </div>
    </div>
  ),
}

export const SkillLevelExample: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md mx-auto space-y-4">
        <SkillLevel skill="React" level={95} icon={<FiTrendingUp />} />
        <SkillLevel skill="TypeScript" level={88} icon={<FiTrendingUp />} />
      </div>
    </div>
  ),
}

export const AchievementBadgeExample: Story = {
  render: () => (
    <div className="p-8 bg-gray-50 dark:bg-gray-900">
      <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
        <AchievementBadge
          title="First Project"
          description="Completed your first project"
          icon={<FiAward />}
          unlocked={true}
        />
        <AchievementBadge
          title="Perfectionist"
          description="Achieve 100% client satisfaction"
          icon={<FiAward />}
          unlocked={false}
          progress={85}
        />
      </div>
    </div>
  ),
}
