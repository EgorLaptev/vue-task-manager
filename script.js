'use strict';

const VA = {
    data() {
        return {
            tasks: [],
            newTask: { id: 0 },
            tasksTab: 'uncompleted'
        }
    },
    methods: {
        addTask() {
            this.tasks.push({
                id: this.newTask.id,
                title: this.newTask.title,
                content: this.newTask.content,
                completed: false
            });
            this.newTask.id++;
        },
        doneTask(id) {
            let index = this.tasks.indexOf(this.tasks.find( task => task.id === id ));
            this.tasks[index].completed = true;
        },
        removeTask(id) {
            let index = this.tasks.indexOf(this.tasks.find( task => task.id === id ));
            this.tasks.splice(index, 1);
        }
    },
    computed: {
        uncompletedTasks() {
            return this.tasks.filter( task => !task.completed);
        },
        completedTasks() {
            return this.tasks.filter( task => task.completed);
        }
    }
}

const app = Vue.createApp(VA);

app.component('task', {
    props: ['title'],
    emits: ['done', 'remove'],
    template:
        `
        <section class="task" >
            <h3 class="task__title"> {{ title }} </h3>
            <p class="task__content"> <slot></slot> </p>
            <button class="task__done" @click="$emit('done')">Done</button>
            <button class="task__remove" @click="$emit('remove')">Remove</button>
        </section>
        `
})

const vm = app.mount('#tasks');