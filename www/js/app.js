angular.module('ToDo', ['ionic'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
})

.controller('ToDoCtrl', function ($scope, $ionicModal, $timeout) {
    if (!angular.isUndefined(window.localStorage['tasks'])){
        $scope.tasks = JSON.parse(window.localStorage['tasks']);
    } else {
        $scope.tasks = [
            {title: "купить чайник", desciption: "желательно прозрачный", done: true},
            {title: "посмотреть фильм", desciption: "боевик", done: false},
            {title: "найти клад", desciption: "чем больше тем лучше", done: false},
            {title: "переплыть океан", desciption: "всякими способами", done: true},
            {title: "поймать чак нориса", desciption: "не дунув трубки мира", done: false},
            {title: "прокатиться на радуге", desciption: "вот это будет ... нечто", done: true}
        ];
    }
    

    $ionicModal.fromTemplateUrl('views/task.html', function (modal) {
        $scope.taskModal = modal;
    },{
        scope: $scope,
        animation: 'slide-in-right'
    });

    $scope.currentTaskId = -1;

    $scope.addNewTask = function(){
        $scope.taskModal.show();

        $scope.activeTask = {
            title: '',
            description: '',
            done: false
        }

        $scope.currentTaskId = -1;
    }

    $scope.closeTask = function(){
        $scope.taskModal.hide();
    }

    $scope.openTask = function(id){
        var task = $scope.tasks[id];
        $scope.currentTaskId = id;
        
        $scope.activeTask = {
            title: task.title,
            description: task.desciption,
            done: task.done
        }

        $scope.taskModal.show();
    }

    $scope.deleteTask = function(id){
        $scope.tasks.splice(id, 1);
        saveItems();
    }

    $scope.submitTask = function(task){
        if ($scope.currentTaskId == -1) {
            $scope.tasks.push({
                title: task.title,
                desciption: task.desciption,
                done: task.done
            });
        } else {
            var id = $scope.currentTaskId;

            $scope.tasks[id].title = task.title;
            $scope.tasks[id].description = task.description;
            $scope.tasks[id].done = task.done;
        }
        
        saveItems();
        $scope.taskModal.hide();
    }

    $scope.saveTasks = function() {
        $timeout(function(){
            saveItems();
        });
    }

    function saveItems() {
        window.localStorage['tasks'] = angular.toJson($scope.tasks);
    }
})
