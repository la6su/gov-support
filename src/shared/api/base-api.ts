import { HttpClient } from './http-client';
import { API_BASE_URL } from '../config/env';

export const apiClient = new HttpClient(API_BASE_URL);
