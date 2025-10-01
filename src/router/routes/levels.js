export default [
  {
    path: 'levels',                  // عنوان URL بعد المسار الأساسي
    children: [
      {
        path: '',                    // يعني /levels
        component: () => import('@/components/admin/levels/LevelsComponent.vue'),
        name: 'admin.levels'         // الاسم الذي يستخدم في router.push أو router-link
      }
    ]
  }
];
