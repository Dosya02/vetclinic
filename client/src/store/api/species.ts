import { API_ROUTES, HTTP_METHOD } from '@constants';
import { SpeciesModel } from '@models';
import { api } from './api';

export const speciesApi = api.injectEndpoints({
  endpoints: (builder) => (
    {
      getSpecies: builder.query<
        { message: string; species: SpeciesModel[] },
        void
      >({
        query: () => (
          {
            url: API_ROUTES.SPECIES.GET_ALL,
            method: HTTP_METHOD.GET,
          }
        ),
        transformResponse: (response: any) => (
          {
            message: response.message,
            species: response.species.map((item: any) => (
              {
                id: item._id,
                name: item.name,
              }
            )),
          }
        ),
        providesTags: ['Species'],
      }),
      createSpecies: builder.mutation<
        { message: string; species: SpeciesModel },
        { name: string }
      >({
        query: (body) => (
          {
            url: API_ROUTES.SPECIES.CREATE,
            method: HTTP_METHOD.POST,
            body,
          }
        ),
        invalidatesTags: ['Species'],
      }),
      updateSpecies: builder.mutation<
        { message: string; species: SpeciesModel },
        { id: string; name: string }
      >({
        query: ({ id, ...rest }) => (
          {
            url: API_ROUTES.SPECIES.UPDATE(id),
            method: HTTP_METHOD.PUT,
            body: rest,
          }
        ),
        invalidatesTags: ['Species'],
      }),
      deleteSpecies: builder.mutation<
        { message: string },
        { id: string }
      >({
        query: ({ id }) => (
          {
            url: API_ROUTES.SPECIES.DELETE(id),
            method: HTTP_METHOD.DELETE,
          }
        ),
        invalidatesTags: ['Species'],
      }),
    }
  ),
});

export const {
  useGetSpeciesQuery,
  useCreateSpeciesMutation,
  useUpdateSpeciesMutation,
  useDeleteSpeciesMutation,
} = speciesApi;
