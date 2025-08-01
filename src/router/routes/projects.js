import CreateProjectComponent from "@/components/admin/projects/CreateProjectComponent.vue";
import ProjectsComponent from "@/components/admin/projects/ProjectsComponent.vue";

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
            }
        ]
    }
]