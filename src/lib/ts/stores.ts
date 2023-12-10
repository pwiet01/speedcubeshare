import { readonly, writable } from 'svelte/store';
import type { User } from 'lucia';

export const writableUser = writable<User | undefined>(undefined);
export const user = readonly(writableUser);
