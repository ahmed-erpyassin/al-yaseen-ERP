export default [
  {
    path: 'documents',                  // عنوان URL بعد المسار الأساسي
    children: [
      {
        path: '',
        component: () => import('@/components/admin/documents/DocumentsComponents.vue'),
        name: 'admin.documents'         // الاسم الذي يستخدم في router.push أو router-link
      },
      {
        path: 'create',
        component: () => import('@/components/admin/documents/CreateDocumentsComponent.vue'),
        name: 'admin.documents.create'         // الاسم الذي يستخدم في router.push أو router-link
      }
    ]
  }
];
