export default [
  {
    path: 'sources',                  // عنوان URL بعد المسار الأساسي
    children: [
      {
        path: '',
        component: () => import('@/components/admin/sources/SourcesComponent.vue'),
        name: 'admin.sources'         // الاسم الذي يستخدم في router.push أو router-link
      },
      {
        path: 'create',
        component: () => import('@/components/admin/sources/CreateSourcesComponent.vue'),
        name: 'admin.sources.create'         // الاسم الذي يستخدم في router.push أو router-link
      }
    ]
  }
];
