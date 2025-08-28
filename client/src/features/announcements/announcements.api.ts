import { api } from '../../app/api';

export type Announcement = {
  _id: string; title: string; body: string; author: string; course: string; avatarUrl?: string; createdAt: string;
};

export const announcementsApi = api.injectEndpoints({
  endpoints: (build) => ({
    listAnnouncements: build.query<Announcement[], void>({
      query: () => `/announcements`,
      providesTags: (res) =>
        res ? [...res.map(({ _id }) => ({ type: 'Announcement' as const, id: _id })), { type: 'Announcement' }] : [{ type: 'Announcement' }]
    }),
    createAnnouncement: build.mutation<Announcement, Partial<Announcement>>({
      query: (body) => ({ url: `/announcements`, method: 'POST', body }),
      invalidatesTags: [{ type: 'Announcement' }]
    }),
    updateAnnouncement: build.mutation<Announcement, { id: string; body: Partial<Announcement> }>({
      query: ({ id, body }) => ({ url: `/announcements/${id}`, method: 'PUT', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Announcement', id }]
    }),
    deleteAnnouncement: build.mutation<{ ok: boolean }, string>({
      query: (id) => ({ url: `/announcements/${id}`, method: 'DELETE' }),
      invalidatesTags: (_r, _e, id) => [{ type: 'Announcement', id }]
    })
  }),
  overrideExisting: false
});

export const {
  useListAnnouncementsQuery,
  useCreateAnnouncementMutation,
  useUpdateAnnouncementMutation,
  useDeleteAnnouncementMutation
} = announcementsApi;
