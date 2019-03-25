import request from 'umi-request';
import { Todo } from './types';

export class TodoService {
    async all() {
        return request("/api/todos")
    }

    async create(item : Todo) {
        return request("/api/todos", {
            method: 'post',
            data: item,
        })
    }

    async delete(id : number) {
        return request(`/api/todos/${id}`, {
            method: 'delete',
        });
    }

    async update(item : Todo) {
        return request(`/api/todos/${item.id}`, {
            method: 'put',
            data: item,
        })
    }
}