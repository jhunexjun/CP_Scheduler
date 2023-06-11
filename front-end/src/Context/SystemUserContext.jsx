import { createContext } from 'react';

export const SystemUserContext = createContext({user: {
													id: '',
												},
												location: '',
												sessionId: '',
											});