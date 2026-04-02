/**
 * 用户档案 store — localStorage 持久化
 * 始终用默认值初始化（避免 SSR/hydration mismatch），
 * 客户端 mount 后再从 localStorage 恢复。
 */
import { atom, onMount } from 'nanostores';
import type { Gender } from '../logic/calculator';

export interface ProfileData {
  gender: Gender;
  age: number;
  height: number;
  weight: number;
  scenarioId: number;
  customCarbQuota: { training: number; rest: number } | null;
  customProteinQuota: { training: number; rest: number } | null;
}

const STORAGE_KEY = 'fitness-profile';

function defaultProfile(): ProfileData {
  return {
    gender: 'male',
    age: 28,
    height: 170,
    weight: 70,
    scenarioId: 3,
    customCarbQuota: null,
    customProteinQuota: null,
  };
}

export const $profile = atom<ProfileData>(defaultProfile());

// Restore from localStorage on client mount
onMount($profile, () => {
  // 确保只在客户端执行
  if (typeof window === 'undefined') return;
  
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // 验证数据完整性
      const restored = { ...defaultProfile(), ...parsed };

      // 验证数值类型的有效性
      if (typeof restored.age === 'number' && restored.age >= 10 && restored.age <= 100 &&
          typeof restored.height === 'number' && restored.height >= 100 && restored.height <= 250 &&
          typeof restored.weight === 'number' && restored.weight >= 30 && restored.weight <= 300 &&
          typeof restored.scenarioId === 'number' && restored.scenarioId >= 1 && restored.scenarioId <= 15) {
        $profile.set(restored);
        $hasCompletedSetup.set(true);
      }
    }
  } catch (e) {
    console.warn('Failed to restore profile from localStorage:', e);
  }

  // Subscribe to save changes
  const unsub = $profile.subscribe(value => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (e) {
      if (e instanceof Error && e.name === 'QuotaExceededError') {
        console.warn('localStorage quota exceeded, unable to save profile');
      } else {
        console.warn('Failed to save profile to localStorage:', e);
      }
    }
  });

  return unsub;
});

export function updateProfile(patch: Partial<ProfileData>) {
  $profile.set({ ...$profile.get(), ...patch });
  $hasCompletedSetup.set(true);
}

/** 用户是否已完成初始设置（localStorage 中存在 profile） */
export const $hasCompletedSetup = atom<boolean>(false);

/** 当前是否力训日 */
export const $isTrainingDay = atom<boolean>(true);

export function toggleDayType() {
  $isTrainingDay.set(!$isTrainingDay.get());
}
