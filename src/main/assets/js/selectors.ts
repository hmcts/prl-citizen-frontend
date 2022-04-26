export const hidden = 'hidden';

export const getById = (id: string): HTMLElement | null => document.getElementById(id);

export const qs = (query: string): HTMLElement | null => document.querySelector(query);

export const qsa = (query: string): NodeListOf<Element> => document.querySelectorAll(query);
