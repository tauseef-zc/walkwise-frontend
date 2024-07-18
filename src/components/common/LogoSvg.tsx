"use client";

import { useThemeMode } from '@/utils/useThemeMode'
import React from 'react'
import LogoDark from './partials/LogoDark';
import Logo from './partials/Logo';

const LogoSvg = () => {
    const { getMode } = useThemeMode();
  return getMode() === 'dark' ? <LogoDark /> : <Logo />
}

export default LogoSvg
