import { writable } from 'svelte/store';
import type { User } from 'lucia';

export const user = writable<User | undefined>(undefined);
