import { api } from './api';
import { UserModel } from '@models';

export const auth = api.injectEndpoints({
                                          endpoints: builder => (
                                            {
                                              getUserInfo: builder.query<UserModel, void>(
                                                {
                                                  query: () => (
                                                    {
                                                      url: '/auth/profile',
                                                      method: 'GET',
                                                    }
                                                  ),
                                                }),
                                            }
                                          ),
                                        });

export const { useGetUserInfoQuery } = auth;