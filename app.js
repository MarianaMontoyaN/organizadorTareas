$(function() {
    let edit = false;
    console.log('funciona JQuery')
    fetchTasks();
    $('#task-result').hide(); 

    ////BUSQUEDA DE TAREAS/////
    $('#search').keyup(function(){ 
        if($('#search').val()){
            let search = $('#search').val();
            $.ajax({
                url: 'task-search.php',
                type: 'POST', 
                data: {search: search}, 
                success: function(response){ 
                    console.log(response);
                    let tasks = JSON.parse(response); 

                    let template = '';
                    tasks.forEach(task => {
                        template += `<li>
                            ${task.name}
                        </li>`
                    });

                    $('#container').html(template); 
                    $('#task-result').show(); 
                }
            })
        }
    })


    ////GUARDAR TAREA/////
    $('#task-form').submit(function(e){ 
        const postData = {
            name: $('#name').val(),
            description: $('#description').val(),
            id: $('#task-id').val()
        };

        let url = edit === false ? 'task-add.php' : 'task-edit.php';

        $.post(url, postData, function(response){ 
            console.log(response);
            fetchTasks();
            $('#task-form').trigger('reset');
        })
        e.preventDefault();
    });


    ////LISTAR Y MOSTRAR TAREAS/////
    function fetchTasks() {
        edit = false;
        $.ajax({
            url: 'task-list.php',
            type: 'GET',
            success: function(response){
                let tasks = JSON.parse(response);
                let template = '';
                tasks.forEach(task => {
                    template += `
                        <tr taskId="${task.id}">
                            <td>${task.id}</td>
                            <td>
                                <a href="#" class="task-item">${task.name}</a>
                            </td>
                            <td>${task.description}</td>
                            <td>
                                <button class="task-delete btn btn-danger">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    `
                });
                $('#tasks').html(template);
            }
        });
    }

    ////ELIMINAR TAREAS/////
    $(document).on('click', '.task-delete', function(){
        if(confirm('¿Estás seguro de eliminar la tarea?')){
        
            let element = $(this)[0].parentElement.parentElement;
            let id = $(element).attr('taskId'); 
            $.post('task-delete.php', {id}, function(response){
                console.log(response);
                fetchTasks();
            })
        }
    })

    $(document).on('click', '.task-item', function(){
        let element = $(this)[0].parentElement.parentElement;
        let id = $(element).attr('taskId');
        $.post('task-single.php', {id}, function(response){
            const task = JSON.parse(response);
            $('#name').val(task.name);
            $('#description').val(task.description);
            $('#task-id').val(task.id);
            edit = true;
        })
        console.log(id);
    })
});

