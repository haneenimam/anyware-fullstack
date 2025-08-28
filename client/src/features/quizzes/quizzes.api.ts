import { api } from '../../app/api';

export type Quiz = { _id: string; title: string; course: string; topic: string; dueDate: string };

export const quizzesApi = api.injectEndpoints({
  endpoints: (build) => ({
    listQuizzes: build.query<Quiz[], void>({
      query: () => `/quizzes`,
      providesTags: (res) =>
        res ? [...res.map(({ _id }) => ({ type: 'Quiz' as const, id: _id })), { type: 'Quiz' }] : [{ type: 'Quiz' }]
    }),
    createQuiz: build.mutation<Quiz, Partial<Quiz>>({
      query: (body) => ({ url: `/quizzes`, method: 'POST', body }),
      invalidatesTags: [{ type: 'Quiz' }]
    }),
    updateQuiz: build.mutation<Quiz, { id: string; body: Partial<Quiz> }>({
      query: ({ id, body }) => ({ url: `/quizzes/${id}`, method: 'PUT', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Quiz', id }]
    }),
    deleteQuiz: build.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/quizzes/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Quiz', id }]
    })
  })
});

export const { useListQuizzesQuery, useCreateQuizMutation, useUpdateQuizMutation, useDeleteQuizMutation } = quizzesApi;
