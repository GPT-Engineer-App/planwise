import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", dueDate: null });
  const [selectedTask, setSelectedTask] = useState(null);

  const addTask = () => {
    setTasks([...tasks, { ...newTask, id: Date.now() }]);
    setNewTask({ title: "", dueDate: null });
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
    setSelectedTask(null);
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Inbox</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Task</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
              <DialogDescription>Fill in the details below to add a new task.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              />
              <Calendar
                mode="single"
                selected={newTask.dueDate}
                onSelect={(date) => setNewTask({ ...newTask, dueDate: date })}
                className="rounded-md border"
              />
            </div>
            <DialogFooter>
              <Button onClick={addTask}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </header>
      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox />
                  <CardTitle>{task.title}</CardTitle>
                </div>
                <div className="flex items-center space-x-2">
                  <span>{task.dueDate ? format(task.dueDate, "PPP") : "No due date"}</span>
                  <Button variant="outline" onClick={() => setSelectedTask(task)}>Edit</Button>
                  <Button variant="destructive" onClick={() => deleteTask(task.id)}>Delete</Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
      {selectedTask && (
        <Dialog open={selectedTask !== null} onOpenChange={() => setSelectedTask(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Task</DialogTitle>
              <DialogDescription>Update the details below to edit the task.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Task Title"
                value={selectedTask.title}
                onChange={(e) => setSelectedTask({ ...selectedTask, title: e.target.value })}
              />
              <Calendar
                mode="single"
                selected={selectedTask.dueDate}
                onSelect={(date) => setSelectedTask({ ...selectedTask, dueDate: date })}
                className="rounded-md border"
              />
            </div>
            <DialogFooter>
              <Button onClick={() => updateTask(selectedTask)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Index;