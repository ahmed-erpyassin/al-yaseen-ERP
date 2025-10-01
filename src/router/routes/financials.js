export default [
  {
    path: 'financials',                  // عنوان URL بعد المسار الأساسي
    children: [
      {
        path: '',                    // يعني /financials
        component: () => import('@/components/admin/financials/FinancialsComponent.vue'),
        name: 'admin.financials'         // الاسم الذي يستخدم في router.push أو router-link
      }
    ]
  }
];
