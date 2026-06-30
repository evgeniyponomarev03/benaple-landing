import React from 'react'

import type { Page } from '@/payload-types'

import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { BenepleHomeHero } from '@/heros/BenepleHome'
import { TailoredHero } from '@/heros/TailoredHero'
import { BenepleWithFormHero } from '@/heros/BenepleWithForm'
import { InsuranceHero } from '@/heros/InsuranceHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  benepleHome: BenepleHomeHero,
  tailoredHero: TailoredHero,
  benepleWithForm: BenepleWithFormHero,
  insuranceHero: InsuranceHero,
}

export const RenderHero: React.FC<Page['hero']> = (
  props,
) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return (
    <HeroToRender
      {...props}
    />
  )
}
