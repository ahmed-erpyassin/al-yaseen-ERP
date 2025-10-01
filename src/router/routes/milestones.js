export default [
  {
    path: 'milestones',                  // عنوان URL بعد المسار الأساسي
    children: [
      {
        path: '',                    // يعني /milestones
        component: () => import('@/components/admin/milestones/MilestonesComponent.vue'),
        name: 'admin.milestones'         // الاسم الذي يستخدم في router.push أو router-link
      }
    ]
  }
];
