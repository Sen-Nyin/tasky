(()=>{"use strict";var t={};t.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),(()=>{var e;t.g.importScripts&&(e=t.g.location+"");var s=t.g.document;if(!e&&s&&(s.currentScript&&(e=s.currentScript.src),!e)){var a=s.getElementsByTagName("script");a.length&&(e=a[a.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),t.p=e})();const e=t.p+"image/sprite.a7fdd62b4bd413ae2311..svg";new class{constructor(t,e){this.view=e,this.model=t,this.view.eventAddTaskProject(this.handleAddTaskProject),this.view.eventDeleteTask(this.handleDeleteTask),this.view.eventCompleteTask(this.handleCompleteTask),this.view.eventDeleteProject(this.handleDeleteProject),this.view.eventClickToEditTask(this.handleGetEditTask),this.view.getProjects=this.handleProjectsRequest,this.model.eventOnTaskChange(this.onTaskChange),this.onTaskChange(this.model.tasks),this.view.eventToggleNav(),this.view.eventForm(),this.view.eventNew(),this.view.buildSubnav()}onTaskChange=t=>this.view.displayTasks(t);handleProjectsRequest=()=>this.model._projects;handleAddTaskProject=(t,e)=>this.model.addTaskProject(t,e);handleGetEditTask=t=>this.model.getTaskToEdit(t);handleEditTask=t=>this.model.editTask(t);handleDeleteTask=t=>this.model.deleteTask(t);handleCompleteTask=t=>this.model.completeTask(t);handleAddProject=t=>this.model.addProject(t);handleDeleteProject=t=>this.model.deleteProject(t)}(new class{constructor(){this.tasks=[],this.projects=[{id:1,name:"uncategorised"}]}get _projects(){return this.projects}getTaskToEdit(t){return this.tasks.filter((e=>e.id===t))}eventOnTaskChange(t){this.onTaskChange=t}_commitTaskChange(t){this.onTaskChange(t)}addTaskProject(t,e){"task"===e?this.addTask(t):"project"===e?this.addProject(t):"edit"===e&&this.editTask(t)}addTask(t){const e={id:this.tasks.length>0?this.tasks[this.tasks.length-1].id+1:1,task:t.title,duedate:t.date,project:t.project,complete:!1};this.tasks.push(e),this._commitTaskChange(this.tasks)}editTask(t){console.log(t.id),this.tasks=this.tasks.map((e=>e.id===t.id?{id:e.id,task:t.title,duedate:t.date,project:t.project,complete:e.complete}:e)),this._commitTaskChange(this.tasks)}deleteTask(t){this.tasks=this.tasks.filter((e=>e.id!==t)),this._commitTaskChange(this.tasks)}completeTask(t){this.tasks=this.tasks.map((e=>e.id===t?{id:e.id,task:e.task,duedate:e.duedate,project:e.project,complete:!e.complete}:e)),this._commitTaskChange(this.tasks)}addProject(t){const e={id:this.projects.length>0?this.projects[this.projects.length-1].id+1:1,name:t};this.projects.push(e)}deleteProject(t){const e=this.projects.filter((e=>e.id===t));this.tasks=this.tasks.map((t=>t.project===e[0].name?{id:t.id,task:t.task,duedate:t.duedate,project:"uncategorised",complete:t.complete}:t)),this.projects=this.projects.filter((e=>e.id!==t)),this._commitTaskChange(this.tasks)}},new class{constructor(){this.elementHeader=this.findEle("header"),this.elementNavContainer=this.findEle('[data-label="nav-container"]'),this.elementNavbar=this.findEle('[data-label="nav-list"]'),this.buttonNewTask=this.findEle('[data-label="new-task-header"]'),this.buttonBurger=this.findEle('[data-label="toggle-navigation"]'),this.elementSubnav=this.findEle('[data-label="sub-nav"]'),this.labelTaskListHeading=this.findEle('[data-label="task-list-title"]'),this.elementTaskList=this.findEle('[data-label="task-list"]'),this.labelModalTitle=this.findEle('[data-label="modal-title"]'),this.elementModal=this.findEle('[data-label="modal"]'),this.form=this.findEle('[data-label="modal-task-form"]')}get _taskDetails(){const t=this.findEle('[data-label="modal-task-title"]'),e=this.findEle('[data-label="modal-task-date"]'),s=this.findEle('[data-label="modal-task-project"]');if(t.value&&e.value&&s.value)return{title:t.value,date:e.value,project:s.value}}get _projectDetails(){return this.findEle('[data-label="project-title"]').value}createEle(...t){const[e,...s]=t,a=document.createElement(e);return s.forEach((t=>a.classList.add(t))),a}createSVG(...t){const[s,...a]=t,i="http://www.w3.org/2000/svg",l=document.createElementNS(i,"svg"),n=document.createElementNS(i,"use");return n.setAttribute("href",`${e}#icon-${s}`),a.forEach((t=>l.classList.add(t))),l.append(n),l}findEle(t){return document.querySelector(t)}eventToggleNav(){this.buttonBurger.addEventListener("click",(t=>{this.elementNavContainer.classList.toggle("nav-hidden")}))}clearTasks(){for(;this.elementTaskList.firstElementChild;)this.elementTaskList.firstElementChild.remove()}clearForm(){for(;this.form.firstElementChild;)this.form.firstElementChild.remove()}clearSubnav(){for(;this.elementSubnav.firstElementChild;)this.elementSubnav.firstElementChild.remove()}displayTasks(t){if(this.clearTasks(),t.length)t.forEach((t=>{const e=this.createSVG("alarm","tasklist-icon"),s=this.createSVG("label","tasklist-icon"),a=this.createSVG("delete","tasklist-button-icon"),i=this.createSVG("edit","tasklist-button-icon"),l=this.createEle("li","tasklist-item");l.dataset.taskid=t.id;const n=this.createEle("span","tasklist-text");n.textContent=t.task;const o=this.createEle("span","tasklist-date");o.textContent=t.duedate,o.prepend(e);const d=this.createEle("span","tasklist-project");d.textContent=t.project,d.prepend(s);const r=this.createEle("input","col-start-1","row-start-1","mr-6");r.type="checkbox";const c=this.createEle("div","tasklist-button-wrapper"),h=this.createEle("button","tasklist-btn","red-btn");h.append(a),h.dataset.label="delete-button";const m=this.createEle("button","tasklist-btn","yellow-btn");m.append(i),m.dataset.label="edit-button",c.append(m,h),t.complete&&(l.classList.add("bg-emerald-100"),r.checked=!0,r.classList.add("accent-emerald-400"),n.classList.add("task-complete"),o.textContent="Complete",o.classList.add("text-gray-500")),l.append(r,n,c,o,d),this.elementTaskList.append(l)}));else{const t=this.createEle("p","no-tasks-message");t.textContent="No tasks, go take a walk",this.elementTaskList.append(t)}}buildModal=(t,e)=>{this.clearForm();const s=this.createEle("div","flex","justify-end","gap-2");s.dataset.label="form-button-container";const a=this.createEle("button","form-button","bg-red-400","hover:bg-red-500");a.dataset.label="close-modal",a.id="close-modal",a.textContent="Cancel";const i=this.createEle("button","form-button","bg-emerald-400","hover:bg-emerald-500");if(i.type="submit",i.dataset.label="submit",i.id="submit",i.textContent="Submit",i.dataset.subtype=t,"task"===t||"edit"===t){this.labelModalTitle.textContent="task"===t?"New Task":"Edit Task";const s=this.createEle("label","form-label");s.textContent="Task title",s.for="modal-task-title";const a=this.createEle("input","form-input");a.dataset.label="modal-task-title",a.type="text",a.id="modal-task-title";const l=this.createEle("label","form-label");l.textContent="Due date",l.for="modal-task-date";const n=this.createEle("input","form-input");n.dataset.label="modal-task-date",n.type="date",n.id="modal-task-date";const o=this.createEle("label","form-label");o.textContent="Project",o.for="modal-project-select";const d=this.createEle("select","form-input");if(d.dataset.label="modal-task-project",d.id="modal-project-select",this.getProjects().forEach((t=>{const e=this.createEle("option");e.value=t.name,e.textContent=t.name,d.append(e)})),"edit"===t){const[t]=e;a.value=t.task,n.value=t.duedate,d.value=t.project,i.dataset.taskid=t.id}this.form.prepend(s,a,l,n,o,d)}else if("project"===t){this.labelModalTitle.textContent="New Project";const t=this.createEle("label","form-label");t.textContent="Project name",t.for="project-title";const e=this.createEle("input","form-input");e.dataset.label="project-title",e.type="text",e.id="project-title",this.form.append(t,e)}s.append(a,i),this.form.append(s),this.elementModal.showModal()};buildSubnav(){this.clearSubnav(),this.getProjects().forEach((t=>{const e=this.createEle("li","project-item");if(e.textContent=t.name,e.dataset.projectid=t.id,t.id>1){e.dataset.projecttype="custom";const t=this.createEle("button","p-1","text-zinc-700","rounded-full","hover:bg-red-500","hover:text-gray-50","duration-300");t.dataset.label="delete-button";const s=this.createSVG("close","w-3","h-3","fill-current","hover:scale-125","duration-300");t.append(s),e.append(t)}this.elementSubnav.append(e)}))}eventForm(){this.form.addEventListener("click",(t=>{"close-modal"===t.target.dataset.label&&this.elementModal.close()}))}eventNew(){this.elementHeader.addEventListener("click",(t=>{t.preventDefault();const e=t.target.closest("button")?.dataset.label;if(e){const t="new-task-header"===e?"task":"new-project-header"===e?"project":null;t&&this.buildModal(t)}}))}eventAddTaskProject(t){this.form.addEventListener("submit",(e=>{const s=e.submitter.dataset.subtype;if("task"===s)this._taskDetails&&t(this._taskDetails,s);else if("project"===s)this._projectDetails&&(t(this._projectDetails,s),this.buildSubnav());else if("edit"===s&&this._taskDetails){const a=this._taskDetails;a.id=Number(e.submitter.dataset.taskid),t(a,s)}}))}eventClickToEditTask(t){this.elementTaskList.addEventListener("click",(e=>{const s=e.target;if("edit-button"===s.closest("button")?.dataset.label){const e=Number(s.closest("li").dataset.taskid),a=t(e);this.buildModal("edit",a)}}))}eventDeleteTask(t){this.elementTaskList.addEventListener("click",(e=>{const s=e.target;if("delete-button"===s.closest("button")?.dataset.label){const e=Number(s.closest("li").dataset.taskid);t(e)}}))}eventCompleteTask(t){this.elementTaskList.addEventListener("change",(e=>{if("checkbox"===e.target.type){const s=Number(e.target.parentElement.dataset.taskid);t(s)}}))}eventDeleteProject(t){this.elementSubnav.addEventListener("click",(e=>{const s=e.target.closest("button");if("delete-button"===s?.dataset.label){const e=s.closest("li").dataset.projectid;t(Number(e)),this.buildSubnav()}}))}})})();