import CreateProjectComponent from "@/components/admin/projects/CreateProjectComponent.vue";
import ProjectsComponent from "@/components/admin/projects/ProjectsComponent.vue";
import RiskManagmentComponent from "@/components/admin/projects/risks/RiskManagmentComponent.vue";
import CloseProjectsComponent from "@/components/admin/projects/closeproject/CloseProjectsComponent.vue";

export default [
    {
        path: "projects",
        children: [
            {
                path: "",
                component: ProjectsComponent,
                name: "admin.projects"
            },{
                path: "create",
                component: CreateProjectComponent,
                name: "admin.projects.create"
            },{
                path: "risks",
                component: RiskManagmentComponent,
                name: "admin.projects.risks"
             },{
                path: "close-projects",
                component: CloseProjectsComponent,
                name: "admin.projects.close"
             },
        ]
    }
]