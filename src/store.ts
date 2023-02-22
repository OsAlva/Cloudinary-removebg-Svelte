import {writable} from 'svelte/store'
import { ImageStatus } from './types.d'


//extados globeles de svelte
export const imageStatus = writable(ImageStatus.READY)
export const originalImage = writable(null)
export const modifiedImage = writable(null)