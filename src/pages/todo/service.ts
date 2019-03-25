import request from 'umi-request';
import { Todo } from './types';

export class TodoService {
  async all() {
    return request('/api/todos');
  }

  async create(item: Todo) {
    return request('/api/todos', {
      method: 'post',
      data: item,
    });
  }

  async delete(id: number) {
    return request(`/api/todos/${id}`, {
      method: 'delete',
    });
  }

  async update(item: Todo) {
    // `umi-request` doesn't support `patch` with data. Using `put` instead.
    // See: https://github.com/umijs/umi-request/pull/32
    return request(`/api/todos/${item.id}`, {
      method: 'put',
      data: item,
    });
  }
}
