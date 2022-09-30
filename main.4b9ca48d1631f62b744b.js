(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var s=t.g.document;if(!e&&s&&(s.currentScript&&(e=s.currentScript.src),!e)){var a=s.getElementsByTagName("script");a.length&&(e=a[a.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();const e=t.p+"image/sprite.4b97bf8a4f94fa947e53..svg";new class{constructor(t,e){this.view=e,this.model=t,this.view.eventUpdateLists(this.handleUpdateLists),this.view.eventDeleteTask(this.handleDeleteTask),this.view.eventCompleteTask(this.handleCompleteTask),this.view.eventDeleteProject(this.handleDeleteProject),this.view.eventClickToEditTask(this.handleGetEditTask),this.view.getProjects=this.handleProjectsRequest,this.model.eventOnTaskChange(this.onTaskChange),this.onTaskChange(this.model.tasks),this.model.eventOnProjectChange(this.onProjectChange),this.onProjectChange(this.model.projects),this.view.eventToggleNav(),this.view.eventCloseModal(),this.view.eventNewProject(),this.view.eventNewTask(),this.view.eventFilter(this.handleFilterTasks),this.filter="all"}onTaskChange=t=>this.view.displayTasks(t);onProjectChange=t=>this.view.displayProjects(t);handleProjectsRequest=()=>this.model._projects;handleUpdateLists=(t,e)=>this.model.updateLists(t,e);handleGetEditTask=t=>this.model.getTaskToEdit(t);handleEditTask=t=>this.model.editTask(t);handleDeleteTask=t=>this.model.deleteTask(t);handleCompleteTask=t=>this.model.completeTask(t);handleAddProject=t=>this.model.addProject(t);handleDeleteProject=t=>this.model.deleteProject(t);handleFilterTasks=t=>this.model.filterTaskList(t)}(new class{constructor(){this.tasks=JSON.parse(localStorage.getItem("tasks"))||[],this.projects=JSON.parse(localStorage.getItem("projects"))||[{id:1,name:"uncategorised"}]}get _projects(){return this.projects}getTaskToEdit(t){return this.tasks.filter((e=>e.id===t))}compare(t,e){return t.complete>e.complete?1:t.complete<e.complete?-1:0}filterTaskList(t){let e;if("all"===t)e=this.tasks;else if("today"===t){const t=(new Date).toDateString();console.log("Today: ",t),e=this.tasks.filter((e=>new Date(e.duedate).toDateString()===t))}else if("upcoming"===t){const t=(new Date).toDateString();e=this.tasks.filter((e=>new Date(e.duedate).toDateString()>t))}else if("overdue"===t){const t=(new Date).toDateString();e=this.tasks.filter((e=>t>new Date(e.duedate).toDateString()&&!e.complete))}else e="High"===t||"Medium"===t||"Low"===t?this.tasks.filter((e=>e.priority===t)):this.tasks.filter((e=>e.project===t));e.sort(this.compare),this.onTaskChange(e)}eventOnTaskChange(t){this.onTaskChange=t}eventOnProjectChange(t){this.onProjectChange=t}_commitTaskChange(t){this.onTaskChange(t),localStorage.setItem("tasks",JSON.stringify(t))}_commitProjectChange(t){this.onProjectChange(t),localStorage.setItem("projects",JSON.stringify(t))}updateLists(t,e){"task"===e?this.addTask(t):"project"===e?this.addProject(t):"edit"===e&&this.editTask(t)}addTask(t){const e={id:this.tasks.length>0?this.tasks[this.tasks.length-1].id+1:1,task:t.title,duedate:t.date,priority:t.priority,project:t.project,complete:!1};this.tasks.push(e),this._commitTaskChange(this.tasks)}editTask(t){this.tasks=this.tasks.map((e=>e.id===t.id?{id:e.id,task:t.title,duedate:t.date,priority:t.priority,project:t.project,complete:e.complete}:e)),this._commitTaskChange(this.tasks)}deleteTask(t){this.tasks=this.tasks.filter((e=>e.id!==t)),this._commitTaskChange(this.tasks)}completeTask(t){this.tasks=this.tasks.map((e=>e.id===t?{id:e.id,task:e.task,duedate:e.duedate,project:e.project,complete:!e.complete}:e)),this.tasks.sort(this.compare),this._commitTaskChange(this.tasks)}addProject(t){const e={id:this.projects.length>0?this.projects[this.projects.length-1].id+1:1,name:t};this.projects.push(e),this._commitProjectChange(this.projects)}deleteProject(t){const[e]=this.projects.filter((e=>e.id===t));this.tasks=this.tasks.map((t=>t.project===e.name?{id:t.id,task:t.task,duedate:t.duedate,project:"uncategorised",complete:t.complete}:t)),this.projects=this.projects.filter((e=>e.id!==t)),this._commitTaskChange(this.tasks),this._commitProjectChange(this.projects)}},new class{constructor(){this.header=this.findEle("header"),this.navContainer=this.findEle('[data-label="nav-container"]'),this.sidebar=this.findEle('[data-label="nav-list"]'),this.burgerBtn=this.findEle('[data-label="toggle-navigation"]'),this.projectList=this.findEle('[data-label="sub-nav"]'),this.newProjectBtn=this.findEle('[data-label="add-project-btn"]'),this.newTaskBtn=this.findEle('[data-label="add-task-btn"]'),this.labelTaskListHeading=this.findEle('[data-label="task-list-title"]'),this.taskList=this.findEle('[data-label="task-list"]'),this.modalTitle=this.findEle('[data-label="modal-title"]'),this.modal=this.findEle('[data-label="modal"]'),this.form=this.findEle('[data-label="modal-task-form"]')}get _taskDetails(){const t=this.findEle('[data-label="modal-task-title"]'),e=this.findEle('[data-label="modal-task-date"]'),s=this.findEle('[data-label="modal-task-project"]');let a;if(this.findEles('input[name="priority"]').forEach((t=>{t.checked&&(a=t.closest("label").textContent)})),t.value&&e.value&&a&&s.value)return{title:t.value,date:e.value,priority:a,project:s.value}}get _projectDetails(){const t=this.findEle('[data-label="project-title"]');if(t.value)return t.value}createEle(...t){const[e,...s]=t,a=document.createElement(e);return s.forEach((t=>a.classList.add(t))),a}createSVG(...t){const[s,...a]=t,i="http://www.w3.org/2000/svg",o=document.createElementNS(i,"svg"),l=document.createElementNS(i,"use");return l.setAttribute("href",`${e}#icon-${s}`),a.forEach((t=>o.classList.add(t))),o.append(l),o}findEle(t){return document.querySelector(t)}findEles(t){return document.querySelectorAll(t)}capitalise(t){return t.charAt(0).toUpperCase()+t.slice(1)}eventToggleNav(){this.burgerBtn.addEventListener("click",(t=>{this.navContainer.classList.toggle("nav-hidden")}))}clear=t=>{for(;t.firstElementChild;)t.firstElementChild.remove()};displayTasks(t){if(this.clear(this.taskList),t.length)t.forEach((t=>{const e=this.createSVG("alarm","tasklist-icon"),s=this.createSVG("label","tasklist-icon"),a=this.createSVG("delete","tasklist-button-icon"),i=this.createSVG("edit","tasklist-button-icon"),o=this.createEle("li","tasklist-item");o.dataset.taskid=t.id,"High"===t.priority&&o.classList.add("high-priority"),"Medium"===t.priority&&o.classList.add("medium-priority"),"Low"===t.priority&&o.classList.add("low-priority");const l=this.createEle("span","tasklist-text");l.textContent=t.task;const n=this.createEle("span","tasklist-date");if((new Date).toDateString()>new Date(t.duedate).toDateString()){const e=Math.round(Math.abs((new Date-new Date(t.duedate))/864e5));n.textContent=`${e} ${e>1?"days":"day"} overdue`,n.classList.add("text-red-500")}else if((new Date).toDateString()===new Date(t.duedate).toDateString())n.textContent="Today!";else{const e=Math.round(Math.abs((new Date(t.duedate)-new Date)/864e5));n.textContent=0===e?"Due tomorrow":t.duedate}n.prepend(e);const r=this.createEle("span","tasklist-project");r.textContent=t.project,r.prepend(s);const d=this.createEle("input","col-start-1","row-start-1","mr-6");d.type="checkbox";const c=this.createEle("div","tasklist-button-wrapper"),h=this.createEle("button","tasklist-btn","red-btn");h.append(a),h.dataset.label="delete-button";const p=this.createEle("button","tasklist-btn","yellow-btn");p.append(i),p.dataset.label="edit-button",c.append(p,h),t.complete&&(o.classList.add("bg-emerald-100"),o.classList.remove("bg-gray-200"),d.checked=!0,d.classList.add("accent-emerald-400"),l.classList.add("task-complete"),n.textContent="Complete",n.classList.add("text-gray-500")),o.append(d,l,c,n,r),this.taskList.append(o)}));else{const t=this.createEle("p","no-tasks-message");t.textContent="No tasks, go take a walk",this.taskList.append(t)}}buildModal=(t,e)=>{this.clear(this.form);const s=this.createEle("div","flex","justify-end","gap-2");s.dataset.label="form-button-container";const a=this.createEle("button","form-button","bg-red-400","hover:bg-red-500");a.dataset.label="close-modal",a.id="close-modal",a.textContent="Cancel";const i=this.createEle("button","form-button","bg-emerald-400","hover:bg-emerald-500");if(i.type="submit",i.dataset.label="submit",i.id="submit",i.textContent="Submit",i.dataset.subtype=t,"task"===t||"edit"===t){this.modalTitle.textContent="task"===t?"New Task":"Edit Task";const s=this.createEle("label","form-label");s.textContent="Task title",s.for="modal-task-title";const a=this.createEle("input","form-input");a.dataset.label="modal-task-title",a.type="text",a.id="modal-task-title";const o=this.createEle("label","form-label");o.textContent="Due date",o.for="modal-task-date";const l=this.createEle("input","form-input");l.dataset.label="modal-task-date",l.type="date",l.id="modal-task-date";const n=this.createEle("label","form-label");n.textContent="Project",n.for="modal-project-select";const r=this.createEle("select","form-input");r.dataset.label="modal-task-project",r.id="modal-project-select",this.getProjects().forEach((t=>{const e=this.createEle("option");e.value=t.name,e.textContent=t.name,r.append(e)}));const d=this.createEle("div","flex","gap-2","justify-center","mb-4"),c=this.createEle("p","form-label");c.textContent="Priority";const h=this.createEle("label","max-w-max","rounded-md","p-2","red-btn");h.for="priority",h.textContent="High";const p=this.createEle("input","w-0","h-0");p.type="radio",p.name="priority",p.value="High",h.append(p);const m=this.createEle("label","max-w-max","rounded-md","p-2","yellow-btn");m.for="priority",m.textContent="Medium";const k=this.createEle("input","w-0","h-0");k.type="radio",k.name="priority",k.value="Medium",m.append(k);const u=this.createEle("label","max-w-max","rounded-md","p-2","green-btn");u.for="priority",u.textContent="Low";const b=this.createEle("input","w-0","h-0");if(b.type="radio",b.name="priority",b.value="Low",u.append(b),d.append(h,m,u),"edit"===t){const[t]=e;a.value=t.task,l.value=t.duedate,r.value=t.project,i.dataset.taskid=t.id,console.log(t),"High"===t.priority&&(p.checked=!0),"Medium"===t.priority&&(k.checked=!0),"Low"===t.priority&&(b.checked=!0)}this.form.prepend(s,a,o,l,c,d,n,r)}else if("project"===t){this.modalTitle.textContent="New Project";const t=this.createEle("label","form-label");t.textContent="Project name",t.for="project-title";const e=this.createEle("input","form-input");e.dataset.label="project-title",e.type="text",e.id="project-title",this.form.append(t,e)}s.append(a,i),this.form.append(s),this.modal.showModal()};displayProjects(t){this.clear(this.projectList),t.forEach((t=>{const e=this.createEle("li","project-item"),s=this.createEle("p");if(s.textContent=t.name,e.dataset.projectid=t.id,e.dataset.label="filter",e.dataset.filter=t.name,e.append(s),t.id>1){e.dataset.projecttype="custom";const t=this.createEle("button","p-1","text-zinc-700","rounded-full","hover:bg-red-500","hover:text-gray-50","duration-300");t.dataset.label="delete-button";const s=this.createSVG("close","w-3","h-3","fill-current","hover:scale-125","duration-300");t.append(s),e.append(t)}this.projectList.append(e)}))}eventCloseModal(){this.form.addEventListener("click",(t=>{"close-modal"===t.target.dataset.label&&this.modal.close()}))}eventNewTask(){this.newTaskBtn.addEventListener("click",(t=>{this.buildModal("task")}))}eventNewProject(){this.newProjectBtn.addEventListener("click",(t=>{this.buildModal("project")}))}eventUpdateLists(t){this.form.addEventListener("submit",(e=>{const s=e.submitter.dataset.subtype;if("task"===s)this._taskDetails&&t(this._taskDetails,s);else if("project"===s)this._projectDetails&&t(this._projectDetails,s);else if("edit"===s&&this._taskDetails){const a=this._taskDetails;a.id=Number(e.submitter.dataset.taskid),t(a,s)}}))}eventClickToEditTask(t){this.taskList.addEventListener("click",(e=>{const s=e.target;if("edit-button"===s.closest("button")?.dataset.label){const e=Number(s.closest("li").dataset.taskid),a=t(e);this.buildModal("edit",a)}}))}eventDeleteTask(t){this.taskList.addEventListener("click",(e=>{const s=e.target;if("delete-button"===s.closest("button")?.dataset.label){const e=Number(s.closest("li").dataset.taskid);t(e)}}))}eventCompleteTask(t){this.taskList.addEventListener("change",(e=>{if("checkbox"===e.target.type){const s=Number(e.target.parentElement.dataset.taskid);t(s)}}))}eventDeleteProject(t){this.projectList.addEventListener("click",(e=>{const s=e.target.closest("button");if("delete-button"===s?.dataset.label){const e=s.closest("li").dataset.projectid;t(Number(e))}}))}eventFilter(t){this.sidebar.addEventListener("click",(e=>{if("filter"===e.target.closest("li")?.dataset.label){const s=e.target.closest("li").dataset.filter;this.labelTaskListHeading.textContent=this.capitalise(s),t(s)}}))}})})();