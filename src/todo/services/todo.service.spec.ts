import { TodoService } from './todo.service';
import { CreateTodoDto } from '../dto/create-todo.dto';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService();
  });

  it('should create a task', () => {
    const dto: CreateTodoDto = { title: 'Test', description: 'Desc' };
    const todo = service.create(dto);
    expect(todo).toHaveProperty('id');
    expect(todo.title).toBe('Test');
    expect(todo.description).toBe('Desc');
    expect(todo.isDone).toBe(false);
  });

  it('should return all tasks', () => {
    service.create({ title: 'First' });
    service.create({ title: 'Second' });

    const result = service.findAll();
    expect(result.length).toBe(2);
    expect(result[0].title).toBe('First');
    expect(result[1].title).toBe('Second');
  });

  it('must find task by id', () => {
    const created = service.create({ title: 'Find Task' });
    const found = service.findOne(created.id);
    expect(found.id).toBe(created.id);
  });

  it('should update the task', () => {
    const created = service.create({ title: 'Old Task' });
    const updated = service.update(created.id, {
      title: 'NewTask',
      isDone: true,
    });
    expect(updated.title).toBe('New Task');
    expect(updated.isDone).toBe(true);
  });

  it('should delete the task', () => {
    const created = service.create({ title: 'Delete Task' });
    service.remove(created.id);
    expect(service.findAll()).toHaveLength(0);
  });
});
